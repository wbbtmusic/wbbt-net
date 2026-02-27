# Sunucu Yeniden Başlatılınca Sitelerin Açılmama Sorunu Çözümü

## Sorun Kimliği
Sunucuyu yeniden başlattıktan sonra, Docker servisleri (`wbbt-app` vb.) çalışmasına rağmen sitelere (WBBT Records, WBBT Net vb.) URL (domain) üzerinden erişilemiyor. Cloudflared tünelleri kapalı kalıyor ve Caddy proxy çalışmıyor.

## Sorunun Asıl Nedenleri
1. **Cloudflared Tünellerinin Kendini Kapatması (Exited):** Sunucu yeniden açılışında Docker'daki `cloudflared` bazen tüneli tam açamaz (token yetkisi, internetin daha gelmemiş olması vb.) ve kendini komple kapatır.
2. **Caddy Port Çakışması (80 ve 443):** Sistemde hem **Native (doğrudan / systemctl ile kurulu)** Caddy hem de Docker içinde çalışan Caddy konteyneri (`wbbt-net-caddy-1`) aynı anda ayağa kalkmaya çalıştığında 80/443 portlarını Docker Caddy işgal eder. Bu yüzden asıl ağ trafiğini yöneten **Native Caddy servisi çöker (failed)**.

---

## 🚀 Hızlı Çözüm Adımları

### 1. Kapanan Cloudflared Tünellerini Geri Aç
Tünellerin çalışmaması internet trafiğinin içeri girememesi demektir. Tünellerin listesini çek:

```bash
docker ps -a | grep cloudflare
```
Çıkan listede en sağda yazan isimleri (örn: `jolly_darwin`, `romantic_carver`) alarak bu kapalı (Exited) tünelleri direkt startla:
```bash
docker start koyteyner_isimleri_buraya
```
*Örnek: `docker start jolly_darwin romantic_carver`*

Hemen doğrula:
```bash
docker ps | grep cloudflare
```
*(Yanlarında **Up** yazıyorsa 1. aşama tamamdır!)*

### 2. Caddy Çakışmasını Yok Et (Kritik Adım)
Docker'ın Caddy'si, asıl Native Caddy'i kilitlediği için aradan çıkarmamız lazım. Limanları meşgul eden bu konteyneri durdurup sil:
```bash
docker stop wbbt-net-caddy-1
docker rm wbbt-net-caddy-1
```

### 3. Asıl Caddy'i (Native) Başlat ve Kontrol Et
Artık portların yolu açıldığı için sitemizin ana yönlendiricisi olan Caddy'yi başlatabiliriz:
```bash
sudo systemctl restart caddy
```
Durumunu görmek için test et:
```bash
systemctl status caddy
```
Burada eğer **`Active: active (running)`** yazısını yeşil olarak görüyorsan, işlemler bitmiştir. Bütün sitelerin yayında!
