import os
import urllib.request
import re
from PIL import Image
import json

def get_og_image(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        match = re.search(r'<meta property="og:image" content="(.*?)"', html)
        if match:
            return match.group(1)
    except Exception as e:
        print(f"Error fetching {url}: {e}")
    return None

def main():
    public_img_dir = r"d:\Indirilenler\wbbt net\public\images"
    os.makedirs(public_img_dir, exist_ok=True)

    # Spotify URLs
    artist_url = "https://open.spotify.com/intl-tr/artist/7JUja5OMAAfIDKkDuimZNd"
    track_url = "https://open.spotify.com/intl-tr/track/2rmkTrFgsywITnb3J9QT3S"

    print("Fetching artist image...")
    artist_img_url = get_og_image(artist_url)
    if artist_img_url:
        print(f"Found artist image: {artist_img_url}")
        img_path = os.path.join(public_img_dir, "brokeplus-pp.jpg")
        urllib.request.urlretrieve(artist_img_url, img_path)
        print("Saved brokeplus-pp.jpg")
        
        # Now create the banner cropped version
        try:
            with Image.open(img_path) as img:
                # Crop top half / shoulder up roughly. 
                # Let's crop the top 60% of the image and make it wide.
                width, height = img.size
                # We want a banner (e.g. 16:9 or similar), let's say 1920x446 ratio roughly 4.3:1
                # If image is square, crop a wide rectangle from the upper part (shoulder up)
                target_ratio = 4.3
                new_width = width
                new_height = int(width / target_ratio)
                
                # If it's a portrait or square, we take the top `new_height` pixels, 
                # maybe starting a bit down so we don't just get the hat.
                top = int(height * 0.1) # skip top 10%
                bottom = top + new_height
                if bottom > height:
                    bottom = height
                    top = max(0, height - new_height)
                    
                banner = img.crop((0, top, width, bottom))
                banner_path = os.path.join(public_img_dir, "brokeplus-cover.jpg")
                banner.save(banner_path)
                print("Saved crop to brokeplus-cover.jpg")
        except Exception as e:
            print(f"Error cropping: {e}")
    else:
        print("Artist image not found on Spotify.")

    print("Fetching track image...")
    track_img_url = get_og_image(track_url)
    if track_img_url:
        print(f"Found track image: {track_img_url}")
        img_path = os.path.join(public_img_dir, "lo-siento.jpg")
        urllib.request.urlretrieve(track_img_url, img_path)
        print("Saved lo-siento.jpg")
    else:
        print("Track image not found on Spotify.")

if __name__ == "__main__":
    main()
