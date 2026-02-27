import requests
import json
import urllib.request
import os

url = "https://open.spotify.com/intl-tr/track/5zIW45MRqbYOjCPTgb6Kx7?si=ed7e025257f94d94"
oembed_url = f"https://open.spotify.com/oembed?url={url}"

try:
    response = requests.get(oembed_url)
    data = response.json()
    thumbnail_url = data.get("thumbnail_url")
    
    if thumbnail_url:
        print(f"Found thumbnail url: {thumbnail_url}")
        output_path = r"d:\Indirilenler\wbbt net\public\images\win-sin-cover.jpg"
        
        # ensure directory exists
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        urllib.request.urlretrieve(thumbnail_url, output_path)
        print(f"Successfully downloaded to {output_path}")
    else:
        print("No thumbnail url found in oembed response")
except Exception as e:
    print(f"Error: {e}")
