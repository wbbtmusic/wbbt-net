import { Artist, Release, AboutContent } from '../types';
import { BLOG_POSTS } from './blogPosts';

// =============================================================================
// ARTISTS DATA
// =============================================================================
export const ARTISTS: Artist[] = [
    {
        id: "wbbt",
        name: "WBBT",
        role: "Founder & EDM Artist",
        realName: "Burak Can Öğüt",
        image: "https://static.wixstatic.com/media/27c1cc_507014528afe445a904eb1ff26eae466~mv2.jpg/v1/fill/w_490,h_461,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/27c1cc_507014528afe445a904eb1ff26eae466~mv2.jpg",
        banner: "https://static.wixstatic.com/media/27c1cc_ddcac3da9bea4394b990d38b83009142~mv2.jpg/v1/fill/w_1905,h_446,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/27c1cc_ddcac3da9bea4394b990d38b83009142~mv2.jpg",
        bio: "Hello, I am WBBT. My legal name is Burak. I was born and raised in Turkey. I am a young musician born in 2004. I started dealing with music in 2020 and later realized that I could make money from this job and make my voice heard by people. I uploaded my songs to digital platforms under the name 'BCO'. My total views in 2 years exceeded 20 million.",
        email: "support@wbbt.net",
        links: {
            spotify: "https://open.spotify.com/intl-tr/artist/1oP8YujvJmuBtwoMD6r2aA?si=0d5a51aac9a74ae9",
            instagram: "https://www.instagram.com/burakcanogut",
            youtube: "https://www.youtube.com/channel/UCckhtTsWd2LOteEwtgtIUqg",
            apple: "https://music.apple.com/us/artist/wbbt/1667468622"
        },
        topTracks: ["Go Bang", "You Know", "Extinction"]
    },
    {
        id: "oyku",
        name: "OYKU",
        role: "Dark Pop Artist & Voice Actor",
        realName: "Öykü Ertek",
        image: "https://static.wixstatic.com/media/27c1cc_0fc326f312834c8198039e2e6d713eb8~mv2.jpg/v1/fill/w_490,h_461,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/27c1cc_0fc326f312834c8198039e2e6d713eb8~mv2.jpg",
        banner: "https://static.wixstatic.com/media/27c1cc_c7b128ab82fc46e78ebcbd3689f24720~mv2.png/v1/fill/w_1905,h_446,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/27c1cc_c7b128ab82fc46e78ebcbd3689f24720~mv2.png",
        bio: "Öykü Ertek was born in 2001 in Bursa, Turkey. She developed an early interest in the arts and began taking vocal and acting lessons in 2016. Today, she is known for her voice acting roles in Valorant (Clove), The Amazing Digital Circus (Pomni), and Wednesday (Agnes DeMille).",
        email: "support@wbbt.net",
        links: {
            spotify: "https://open.spotify.com/intl-tr/artist/5enChFTWt6t2cuaUZW9NVC?si=37e63316fd184170",
            instagram: "https://www.instagram.com/oykuertek",
            soundcloud: "https://soundcloud.com/oykumusic"
        },
        topTracks: ["Above", "Deal"]
    },
    {
        id: "hugola",
        name: "HUGOLA",
        role: "EDM Artist",
        realName: "Hürkan Gügen",
        image: "https://static.wixstatic.com/media/27c1cc_02da5c37f875425cbf1ddcba6a83e6ec~mv2.jpg/v1/fill/w_420,h_395,al_c,lg_1,q_80,enc_avif,quality_auto/27c1cc_02da5c37f875425cbf1ddcba6a83e6ec~mv2.jpg",
        banner: "https://static.wixstatic.com/media/27c1cc_26a5e38d57a94b8495291dd6aed30597~mv2.jpg/v1/fill/w_1080,h_253,al_c,q_80,enc_avif,quality_auto/27c1cc_26a5e38d57a94b8495291dd6aed30597~mv2.jpg",
        bio: "Hugola (Hürkan Gügen), born on April 23, 1999, is one of Turkey's leading YouTubers and social media influencers. Standing at 1.92 cm tall and weighing 90 kg, Hugola embodies the determination and persistence of his Taurus zodiac sign. He has made a name for himself not only in the digital content world but also on the EDM scene.",
        email: "support@wbbt.net",
        links: {
            spotify: "https://open.spotify.com/intl-tr/artist/5W7To6eOJUNdCQpTQdXiJk?si=7b0e28be1a1e4b5d",
            instagram: "https://www.instagram.com/hurkangugen",
            youtube: "https://m.youtube.com/channel/UC6F8_4OLIQ9bkurVgdcLAeQ",
            apple: "https://music.apple.com/tr/artist/hugola/1469489800"
        },
        topTracks: ["The Bliss", "Lutherian", "DJ Wars 3"]
    },
    {
        id: "ava-aurora",
        name: "AVA AURORA",
        role: "Dark Pop Artist",
        realName: "Ava Aurora",
        image: "https://static.wixstatic.com/media/27c1cc_8188aeb0977148cababd0b504d3d6957~mv2.jpg/v1/fill/w_490,h_461,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/27c1cc_8188aeb0977148cababd0b504d3d6957~mv2.jpg",
        banner: "https://static.wixstatic.com/media/27c1cc_100ccda3183e4f28af53bef433e90c42~mv2.jpg/v1/fill/w_1024,h_240,al_c,q_80,enc_avif,quality_auto/27c1cc_100ccda3183e4f28af53bef433e90c42~mv2.jpg",
        bio: "Ava Aurora is a dark pop artist created by WBBT Records as a virtual character. She is a digital entity that brings a different breath to the music world. In Ava Aurora's virtual world, she fascinates her listeners by sharing her songs full of deep and impressive melodies.",
        email: "support@wbbt.net",
        links: {
            spotify: "https://open.spotify.com/intl-tr/artist/7CbPviVzVEuXqNFSzClsp8?si=e4b0627d20224aad",
            instagram: "https://www.instagram.com/avaauroramusic/",
            youtube: "https://www.youtube.com/channel/UCKVSRPpvwR4Tthpydfb6Ltg",
            apple: "https://music.apple.com/us/artist/ava-aurora/1719008096"
        },
        topTracks: ["Burn For You", "Hold On", "I Want"]
    },
    {
        id: "voxa",
        name: "VOXA",
        role: "K-Pop Artist",
        realName: "Ae-Cha Yoo",
        image: "https://static.wixstatic.com/media/27c1cc_ff93532d464c4ed9818fe13171d1d7f8~mv2.webp/v1/fill/w_448,h_421,al_c,lg_1,q_80,enc_avif,quality_auto/27c1cc_ff93532d464c4ed9818fe13171d1d7f8~mv2.webp",
        banner: "https://static.wixstatic.com/media/27c1cc_0a09f6ff864c46b2b2d2044b71d842ae~mv2.jpg/v1/fill/w_896,h_210,al_c,q_80,enc_avif,quality_auto/27c1cc_0a09f6ff864c46b2b2d2044b71d842ae~mv2.jpg",
        bio: "Voxa is a K-pop artist created by WBBT Records. Stepping into the world of music as a virtual character, Voxa fascinates its listeners with its unique style and impressive performances. Drawing attention with its stage performances and visual aesthetics, Voxa has a large fan base among young listeners.",
        email: "support@wbbt.net",
        links: {
            spotify: "https://open.spotify.com/intl-tr/artist/6wua8Da1W5rY5aAcmW2kMe?si=mH_o8bW8RVuiBcmVter_lw",
            instagram: "https://www.instagram.com/yoovoxa/",
            youtube: "https://www.youtube.com/channel/UCX1hDPKSLgMV8U-XjRperww",
            apple: "https://music.apple.com/us/artist/voxa/1723333894"
        },
        topTracks: ["Until The Sunrise", "Bored", "Medicine"]
    },
    {
        id: "wbco",
        name: "WBCO",
        role: "EDM Artist",
        realName: "Ava Tyson",
        image: "https://static.wixstatic.com/media/27c1cc_6ba66d93164c47f880780a54cfa38bb8~mv2.jpg/v1/fill/w_490,h_461,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/27c1cc_6ba66d93164c47f880780a54cfa38bb8~mv2.jpg",
        banner: "https://static.wixstatic.com/media/11062b_a37fe77cd79c4de48701b7ea61a58ca2~mv2.jpg/v1/fill/w_1905,h_446,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_a37fe77cd79c4de48701b7ea61a58ca2~mv2.jpg",
        bio: "WBCO is one of the new rising stars of electronic music. This virtual artist, whose identity is kept secret, has started to make a name for himself in Turkey's leading electronic music scene. WBCO stands out with its unique dark and atmospheric sound.",
        email: "support@wbbt.net",
        links: {
            spotify: "https://open.spotify.com/intl-tr/artist/30X4muYxpM6ECFLSf8zxnQ?si=nqH05A6USHCHlsp5LYVikg",
            youtube: "https://www.youtube.com/channel/UCbapCcXFS7H8CiUdjl3Ef1A"
        },
        topTracks: ["Party Everyday"]
    },
    {
        id: "vixt",
        name: "VIXT",
        role: "Phonk Artist",
        realName: "Unknown",
        image: "https://static.wixstatic.com/media/27c1cc_380cbac0203546a5bc804cf0a08d098c~mv2.jpg/v1/fill/w_490,h_461,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/27c1cc_380cbac0203546a5bc804cf0a08d098c~mv2.jpg",
        banner: "https://static.wixstatic.com/media/27c1cc_5e0f1c1f2b9b4f7cb060d9c267329bfd~mv2.jpeg/v1/fill/w_1024,h_240,al_c,q_80,enc_avif,quality_auto/27c1cc_5e0f1c1f2b9b4f7cb060d9c267329bfd~mv2.jpeg",
        bio: "VIXT is an artist known for phonk tracks enriched with electric guitar. Aiming to create a different style and atmosphere in music, VIXT presents his works to the audience anonymously.",
        email: "support@wbbt.net",
        links: {
            spotify: "https://open.spotify.com/intl-tr/artist/1mghUidK9BXvVof6EI308I?si=9826938a3f1d4f7c",
            youtube: "https://www.youtube.com/channel/UCPxYcvS3tAur3stGUNjl1AA"
        },
        topTracks: ["Everyone", "Luna"]
    },
    {
        id: "noura",
        name: "NOURA",
        role: "Multidisciplinary Artist",
        realName: "Noura Al-Jaber",
        image: "https://images.unsplash.com/photo-1554151228-14d9def656ec?q=80&w=1786&auto=format&fit=crop",
        banner: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=1972&auto=format&fit=crop",
        bio: "Noura Al-Jaber (29) is a multidisciplinary artist based in Dubai, originally hailing from Beirut. Working from her sun-drenched studio near Alserkal Avenue, she blends a rich heritage of traditional craftsmanship with contemporary energy. Her work, spanning large-scale ceramic sculptures and expressive painting, embraces the tactile nature of raw materials. A modern bohemian soul, Noura creates organic art that bridges ancient Middle Eastern motifs with the present day.",
        email: "noura@wbbt.net",
        links: {
            instagram: "https://instagram.com"
        },
        topTracks: [],
        comingSoon: true
    }
];

// =============================================================================
// RELEASES DATA - En güncel liste (db.json'dan)
// =============================================================================
export const RELEASES: Release[] = [
    { id: 1770211945948, artist: "WBBT", title: "Do It Right", cover: "/do-it-right-cover.jpg", spotify: "https://open.spotify.com/intl-tr/track/4z5PAQ9fDtaZfM0d9GmGXL?si=a159ee5cc17b4246" },
    { id: 1, artist: "Oyku", title: "Above", cover: "https://static.wixstatic.com/media/27c1cc_3e1a878e9b434dcda2de94272e233893~mv2.webp", spotify: "https://artists.landr.com/057914012902" },
    { id: 2, artist: "Ava Aurora X WBBT", title: "Burn For You", cover: "https://static.wixstatic.com/media/27c1cc_e8bf3bec52634748a63057e32ae1a4dd~mv2.webp", spotify: "https://artists.landr.com/057829616833" },
    { id: 3, artist: "WBBT", title: "Go Bang", cover: "https://static.wixstatic.com/media/27c1cc_e2789a7cdf7545159ba0b81935793e6a~mv2.webp", spotify: "https://artists.landr.com/057829616295" },
    { id: 4, artist: "VOXA", title: "Until The Sunrise", cover: "https://static.wixstatic.com/media/27c1cc_ff93532d464c4ed9818fe13171d1d7f8~mv2.webp", spotify: "https://artists.landr.com/057829616424" },
    { id: 5, artist: "Oyku", title: "Deal", cover: "https://static.wixstatic.com/media/27c1cc_dd1e230fa4624ee2864ea5368ccaf60e~mv2.png", spotify: "https://open.spotify.com/intl-tr/track/0YHhiLVj2ikYzBmIGxDtiy?si=278f65729d6a4374" },
    { id: 6, artist: "Ava Aurora", title: "Hold On", cover: "https://static.wixstatic.com/media/27c1cc_dada2652eb964f3aa2c69063a5b1eac5~mv2.webp", spotify: "https://artists.landr.com/057829545427" },
    { id: 7, artist: "WBBT", title: "You Know", cover: "/you-know-cover.jpg", spotify: "https://open.spotify.com/intl-tr/track/1aDIRge0dMw9G4Fu4mPfou?si=c656214e24a649fe" },
    { id: 8, artist: "Hugola", title: "The Bliss", cover: "https://static.wixstatic.com/media/27c1cc_1d53bdc0393046a39b73148e098bd98a~mv2.jpg", spotify: "https://open.spotify.com/intl-tr/album/3NwPimqB4uCoMC2mDt0pn2?si=q84IESrFT7SnuVDOmfKaww" },
    { id: 9, artist: "WBBT X HUGOLA", title: "LUTHERIAN (VOCAL VER.)", cover: "https://static.wixstatic.com/media/27c1cc_18acd7d347834ca0876190387c46f54c~mv2.png", spotify: "https://open.spotify.com/intl-tr/track/6VxpQ8QNLmNyRUExbYCjqL?si=20753b5f3deb4422" },
    { id: 10, artist: "HUGOLA", title: "POŞET 2", cover: "https://static.wixstatic.com/media/27c1cc_7dceff54df2c4826a4315725df0d782b~mv2.jpg", spotify: "https://open.spotify.com/intl-tr/album/7DIeq7L9NGtWuhe2fj8L0M?si=EeNfcZW6QQOkH1Km4X14Sg" },
    { id: 11, artist: "WBBT X Ava Aurora", title: "Ö.", cover: "https://static.wixstatic.com/media/27c1cc_0be0edb3d17f4cf6b4beca65248331eb~mv2.png", spotify: "https://open.spotify.com/intl-tr/album/0goTVAAq7D8YeH7jhLc8P2?si=26b13e1c394f4eb2" },
    { id: 12, artist: "WBBT X Ava Aurora", title: "Storm", cover: "https://static.wixstatic.com/media/27c1cc_bea9e466b24342fa9eb26fb932d50456~mv2.png", spotify: "https://open.spotify.com/intl-tr/track/0qD1uW8YQoRAOvA2GlTpF5?si=2fa6998053eb4559&nd=1&dlsi=ccbf587d8ffa46c8" },
    { id: 13, artist: "WBBT X UPVN", title: "THE ONE", cover: "https://static.wixstatic.com/media/27c1cc_bbc7c81ed1aa4be2a887d416f24d88f4~mv2.png", spotify: "https://unchainedmusic.lnk.to/0b3fb0a2e9f0c8a83e96" },
    { id: 14, artist: "HUGOLA", title: "DJ Wars 3", cover: "https://static.wixstatic.com/media/27c1cc_405c79c77c6744c2ad2eb5554e443650~mv2.jpg", spotify: "https://open.spotify.com/intl-tr/album/3fRuinWrvahUz8FBZlbbWd?si=dFBjU9UkR9uum95FLA7wVQ" },
    { id: 15, artist: "HUGOLA", title: "U A YEAH", cover: "https://static.wixstatic.com/media/27c1cc_67a9135b5360460c85121b26a994ffb7~mv2.jpg", spotify: "https://open.spotify.com/intl-tr/album/1vxgIwrQ2LCWqZYPT7rC0U?si=GcfP3yJJQAuBWX_PLYM_0Q&nd=1&dlsi=979afd1942c04694" },
    { id: 16, artist: "WBCO", title: "Party Everyday", cover: "https://static.wixstatic.com/media/27c1cc_cece63fb021640fb997ffacf0b2c42b5~mv2.png", spotify: "https://open.spotify.com/intl-tr/track/1A04jAIYibjH3aiuEJ5BDb?si=9aca2f6931904b00" },
    { id: 17, artist: "HUGOLA", title: "Cheer of Eve", cover: "https://static.wixstatic.com/media/27c1cc_ba616f7df18a42a5b0186d9541792e52~mv2.jpg", spotify: "https://open.spotify.com/intl-tr/track/6cEOPx9JqyLoGyYshUj863?si=faf7b89ac1a24e4c" },
    { id: 18, artist: "Ava Aurora", title: "I Want", cover: "https://static.wixstatic.com/media/27c1cc_97c9bcdaa3da4abea81c3bf22c3f7946~mv2.jpg", spotify: "https://artists.landr.com/055855067135" },
    { id: 19, artist: "VIXT", title: "Everyone", cover: "https://static.wixstatic.com/media/27c1cc_392da06c0afb4d2086358cc2aacb7457~mv2.jpg", spotify: "https://artists.landr.com/064837819938" },
    { id: 20, artist: "HUGOLA", title: "Just Being Honest", cover: "https://static.wixstatic.com/media/27c1cc_7ad0b024ab90442cb2a57048a0035a02~mv2.png", spotify: "https://open.spotify.com/intl-tr/track/7xCHMcvUYiOKvAZxVwDNjf?si=bf53413625fd4e0e" },
    { id: 21, artist: "Ava Aurora", title: "Bad Blood", cover: "https://static.wixstatic.com/media/27c1cc_d2422b5db01247a2a344f3a38efb45b5~mv2.png", spotify: "https://open.spotify.com/intl-tr/track/0LbCC69JlsQj6V031gxurj?si=943659b005244697" },
    { id: 22, artist: "WBBT", title: "Love Drunk", cover: "https://static.wixstatic.com/media/27c1cc_1a5d5023dd464a5bba1f732c6dca8a36~mv2.png", spotify: "https://open.spotify.com/intl-tr/track/7I3AomlEsEU5GC0T94HRTe?si=011a683405144f7c" },
    { id: 23, artist: "HUGOLA", title: "Lutherian", cover: "https://static.wixstatic.com/media/27c1cc_edbd7229beae49fabc7e89e6b5e546a6~mv2.jpg", spotify: "https://open.spotify.com/intl-tr/track/3Z8nIlJkA1pGkFJEpblOgl?si=4dc4c9f54d49466d&nd=1&dlsi=23cbe6407aa847a6" },
    { id: 24, artist: "HUGOLA", title: "Don't Swing", cover: "https://static.wixstatic.com/media/27c1cc_b48526fa27a34bacbf246acb21b8cfb6~mv2.jpg", spotify: "https://open.spotify.com/intl-tr/track/45wDNOAGbS8P10kbvaXLpT?si=4a11a51a1df5423d" },
    { id: 25, artist: "VOXA", title: "Bored", cover: "https://static.wixstatic.com/media/27c1cc_77febcf02acd40b9a824fe68273ff5b7~mv2.jpeg", spotify: "https://open.spotify.com/intl-tr/track/0OUtVW0SEPM14Ri5eaVqK9?si=58c0292b11254984" },
    { id: 26, artist: "HUGOLA", title: "Mind Flasher", cover: "https://static.wixstatic.com/media/27c1cc_788d1d22e007456182604068ca3256b3~mv2.jpg", spotify: "https://open.spotify.com/intl-tr/track/74xdfYdKGGaObWvLmU37zz?si=b803ef4664a543d4" },
    { id: 27, artist: "VOXA", title: "Medicine", cover: "https://static.wixstatic.com/media/27c1cc_f144a61d7fe545c882a630ea9816ef2d~mv2.png", spotify: "https://open.spotify.com/intl-tr/track/5Tk7v74PJ0IeevlM8wYC4i?si=024cb889ad0048c9" },
    { id: 28, artist: "HUGOLA", title: "Las Olas", cover: "https://static.wixstatic.com/media/27c1cc_f4c45f083b2f41118a87e6cd3b5aae99~mv2.jpg", spotify: "https://open.spotify.com/intl-tr/track/5XKmQJq70rGT3vK5Macqtp?si=40c95016e8af49d6" },
    { id: 29, artist: "VOXA", title: "Everything You Say", cover: "https://static.wixstatic.com/media/27c1cc_1a072beaa4d446c6a78e0384a6ed31a2~mv2.jpeg", spotify: "https://open.spotify.com/intl-tr/track/6GVyPBGAd2fSl188FmF3w1?si=92f6e3253ac54e4f" },
    { id: 30, artist: "HUGOLA", title: "The Robbery", cover: "https://static.wixstatic.com/media/27c1cc_4f893fa4af4646e7ae57607048f1f5ff~mv2.jpg", spotify: "https://open.spotify.com/intl-tr/track/5CRwlbanrd4Nej3EP5Xuwb?si=84e7023d23484b2e&nd=1&dlsi=b88bb7322e54414a" },
    { id: 31, artist: "Ava Aurora", title: "O.U.K.", cover: "https://static.wixstatic.com/media/27c1cc_73bbbd1decdb40daaa690e7a8a9038ea~mv2.jpg", spotify: "https://open.spotify.com/intl-tr/album/3KFg2QtGSs4iTRnVKYdZ6H?si=d6b3dce9abfa4b3d" },
    { id: 32, artist: "WBBT", title: "Extinction", cover: "https://static.wixstatic.com/media/aae1ca_f6a4d67232b441868ec24136e2814ac0~mv2.jpg", spotify: "https://open.spotify.com/album/0AvzF3BCWqZwOFaQfKqLw6?si=6m7OxiosSTmsuX6QtcMhLg" },
    { id: 33, artist: "WBBT", title: "Anywhere", cover: "https://static.wixstatic.com/media/aae1ca_2ebfb5f998294ecd90b726f9b720a610~mv2.png", spotify: "https://open.spotify.com/track/1vFZNenfkvMZyFkr4KcBiA?si=dc3a366566144c72" },
    { id: 34, artist: "HUGOLA", title: "Çok Sıkıldım", cover: "https://static.wixstatic.com/media/27c1cc_234e7cd1bbec4db6930033bb43152fe4~mv2.jpg", spotify: "https://open.spotify.com/intl-tr/track/2GCAGu3JrgZIdAx5kCEc3e?si=92712188b92941cd" },
    { id: 35, artist: "WBBT", title: "Gone", cover: "https://static.wixstatic.com/media/aae1ca_c3339229b20b44c687a1b7b0a214c2ba~mv2.png", spotify: "https://open.spotify.com/track/4zD1d7MiBZ9R4V4ws64q93?si=d925e7d76f264ff4" },
    { id: 36, artist: "HUGOLA", title: "A Broken Dream", cover: "https://static.wixstatic.com/media/27c1cc_fa2409a568c3465c9f1dac403741d998~mv2.jpg", spotify: "https://open.spotify.com/intl-tr/track/5iijdRj2i1Uju0svoeQDHX?si=0a1b582e917147a3" },
    { id: 37, artist: "WBBT", title: "I Like That", cover: "https://static.wixstatic.com/media/aae1ca_17ed63fe74a34eeeadf9468e0417e07d~mv2.png", spotify: "https://open.spotify.com/track/5vhmQGXBYCrbSoZRH5TwlM?si=cfb60a7f52f74701" },
    { id: 38, artist: "WBBT X NOES", title: "KISS", cover: "https://static.wixstatic.com/media/aae1ca_44db135f08de4fd99e546fd5d3fecf69~mv2.png", spotify: "https://open.spotify.com/track/0SfvpsxuHn2klruOcjUeQO?si=9bd800824ee247eb" },
    { id: 39, artist: "WBBT", title: "Breathless", cover: "https://static.wixstatic.com/media/aae1ca_76b2158913a14a1792d77e03c7ec4982~mv2.png", spotify: "https://open.spotify.com/track/0GT6fzm9goOA9oBp0S6WwW?si=18ad0b1c1245482d" },
    { id: 40, artist: "WBBT", title: "Hard Times", cover: "https://static.wixstatic.com/media/aae1ca_1401bc2046344ec7b4cf0b9a85798587~mv2.png", spotify: "https://open.spotify.com/album/1xxS7OkDVBgjwjIGKpjk0r?si=NXxSBAL4RVC0lLQwvlEh6g" },
    { id: 41, artist: "WBBT", title: "Say It", cover: "https://static.wixstatic.com/media/aae1ca_c408aa77c4134e029ce985c1595e0a9c~mv2.jpg", spotify: "https://open.spotify.com/intl-tr/album/57rFSLPUjEWUURWcUWZTt6?si=sbvVAabRStSOMz8lwlGF3g" },
    { id: 42, artist: "VIXT", title: "Luna", cover: "https://static.wixstatic.com/media/27c1cc_244f011a662b4f9fadcf0cadfbcb65a2~mv2.jpg", spotify: "https://artists.landr.com/055120993978" },
    { id: 43, artist: "WBBT", title: "Idea", cover: "https://static.wixstatic.com/media/aae1ca_a8f16e65306345c78911a5903bc0cabf~mv2.png", spotify: "https://open.spotify.com/intl-tr/album/1zuuUsq1FRuSYiivmsdVVE?si=0zLjVv04TfqMsDSMFIlNhw" },
    { id: 44, artist: "WBBT", title: "Noot Noot House", cover: "https://static.wixstatic.com/media/27c1cc_d6cdb420aa13489b8df46b2ca395ce76~mv2.jpg", spotify: "https://open.spotify.com/track/44S6X9v6v9v6v9v6v9v6v9v" },
    { id: 45, artist: "WBBT", title: "Psychedelic", cover: "https://static.wixstatic.com/media/aae1ca_5e6ea2042c4246b698f72c4139490c39~mv2.jpg", spotify: "https://open.spotify.com/album/11a4jYRqSIm8SUOd4Ry6ec?si=IqTW0uxmTOCkd8RCEh9FUA" },
    { id: 46, artist: "WBBT", title: "Lived", cover: "https://static.wixstatic.com/media/aae1ca_fd47aaa56db546e88b88174b9dd5921e~mv2.jpg", spotify: "https://open.spotify.com/intl-tr/album/3CFMmIqassydafWWWdMbuT?si=TyZ2_fpUS-SSIZS-UscCIg" },
    { id: 47, artist: "WBBT", title: "Leaves", cover: "https://static.wixstatic.com/media/aae1ca_a0faa33b9aab4df18f69a0e695e3c8e9~mv2.png", spotify: "https://open.spotify.com/album/6QlfSXpAbXo9yGfBxCGP1t?si=aO5G_WX6RGuwmp6UjyFY8Q" },
    { id: 48, artist: "WBBT", title: "Eyes On Me", cover: "https://static.wixstatic.com/media/27c1cc_6f0e2c545a7a44489eb028a395135e6f~mv2.jpg", spotify: "https://artists.landr.com/055855206855" },
    { id: 49, artist: "WBBT", title: "AYO", cover: "https://static.wixstatic.com/media/aae1ca_1e9ce53422134eb5ad41c07819153fbc~mv2.png", spotify: "https://open.spotify.com/album/2rSDUFlAMMRK2AOSYVN3zL?si=SXHPs3O5T26DxZ7z6cM57w" },
    { id: 50, artist: "HUGOLA", title: "1 Dakikada Dans", cover: "https://static.wixstatic.com/media/27c1cc_a9c12d876b534b45940ebda107afe9e7~mv2.jpg", spotify: "https://open.spotify.com/intl-tr/track/0ZYciM5aBLDEdQHqUY4YiN?si=5f089eb13e2b489a" },
    { id: 51, artist: "HUGOLA", title: "Cyberpunk", cover: "https://static.wixstatic.com/media/27c1cc_5086264922c6463287b67cfba6fdcceb~mv2.jpg", spotify: "https://open.spotify.com/intl-tr/track/5vWyhml3ZeRtSaGFczbW7q?si=4c04fd9576b1475c" },
    { id: 52, artist: "HUGOLA", title: "GTA Turk City", cover: "https://static.wixstatic.com/media/27c1cc_2c9e272744e14d5293c47e3ea09b8227~mv2.jpg", spotify: "https://open.spotify.com/intl-tr/track/6ODuznDUOCgX9pcW73LzS2?si=cb5c37446ebe42a3&nd=1&dlsi=ee18852a5e044f6f" },
    { id: 53, artist: "HUGOLA", title: "Yalan", cover: "https://static.wixstatic.com/media/27c1cc_08b51ec9672b4f96bc0671d5c2d70658~mv2.jpg", spotify: "https://open.spotify.com/intl-tr/track/3yMF7Hx5yLi3aWaAhTsoA7?si=917c094a6ecb4683" },
    { id: 54, artist: "HUGOLA", title: "DJ Wars 2", cover: "https://static.wixstatic.com/media/27c1cc_26c238f5667f41da9b1a73d30b2ba7ad~mv2.jpg", spotify: "https://open.spotify.com/intl-tr/track/6SRusf9uk6sFQWmAhztfE6?si=5afe74bb54874267" },
    { id: 55, artist: "HUGOLA", title: "DJ Wars 1", cover: "https://static.wixstatic.com/media/27c1cc_f0e916272e7e4700a2836be5fc0d36d0~mv2.jpg", spotify: "https://open.spotify.com/intl-tr/track/1LT1cIDxdF6rKb9yjkQc3i?si=ffd7e2e71cc14c20" },
    { id: 56, artist: "HUGOLA", title: "Araba", cover: "https://static.wixstatic.com/media/27c1cc_54766c2201cf421ea9d892c4e177103a~mv2.jpg", spotify: "https://open.spotify.com/intl-tr/track/5a931JiMc3nE77xerTbyJY?si=9ee398d823544758" }
];

// =============================================================================
// BLOG POSTS DATA
// =============================================================================
export { BLOG_POSTS };

// =============================================================================
// ABOUT CONTENT DATA
// =============================================================================
export const ABOUT_CONTENT: AboutContent = {
    title: "ABOUT WBBT RECORDS",
    paragraphs: [
        "<strong class=\"text-white font-bold\">WBBT Records</strong> is a premier UK-based independent record label headquartered in West Drayton, London. Founded in 2020 by visionary entrepreneur and musician <strong class=\"text-white\">Burak Can Öğüt</strong>, our mission is to redefine the landscape of modern music distribution and artist development.",
        "Born from a passion to bridge the gap between digital innovation and authentic musical expression, WBBT Records has grown from a bedroom project into a formidable player in the global music industry. We specialize in identifying unique talent and providing the infrastructure, from distribution to marketing, necessary to build sustainable careers in a streaming-first world.",
        "Our ethos is simple: <strong>Artist First.</strong> We empower musicians to create, share, and monetize their art without compromising their creative vision. Whether it's EDM, Pop, or experimental audio, WBBT Records is the home for the next generation of sound."
    ],
    founderStory: [
        "In 2020, <strong class=\"text-white\">Burak Can Öğüt</strong> started WBBT Records in his bedroom with nothing but a laptop and a dream. He was producing songs entirely on his own, navigating the complex music world from scratch.",
        "As an independent artist, Burak quickly realized a harsh truth: the industry was designed to exploit creators. Platforms and distributors were taking massive cuts while offering little to no support, leaving artists to fight for their rights alone. Frustrated by this system, he decided to change it.",
        "He founded <strong class=\"text-white font-bold\">WBBT Records</strong> with a singular mission: to be the shield and sword for artists. We exist to protect your rights, maximize your earnings, and provide the full support that Burak wished he had when he started. We are here to ensure no artist has to face the industry alone again."
    ],
    missionTitle: "Our Story & Vision",
    missionText: "From Burak Can Öğüt's first release as 'WBBT' to a full-service label, our journey is a testament to the power of independent music. We aim to be more than just a label; we are a cultural platform engaging listeners and building loyal fanbases worldwide.",
    contactTitle: "Get in Touch",
    contactEmail: "support@wbbt.net",
    contactDemoUrl: "https://app.wbbt.net",
    address: {
        line1: "S7-322888 WBBT Group",
        line2: "UNIT 2 HORTON INDUSTRIAL PARK",
        line3: "HORTON ROAD",
        city: "WEST DRAYTON",
        state: "MIDDLESEX",
        zip: "UB7 8JD",
        country: "London, United Kingdom"
    }
};
