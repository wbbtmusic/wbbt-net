from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os
import io

# Visual Configuration
WIDTH = 1200
HEIGHT = 630
BG_COLOR = (10, 10, 18) # Dark Navy/Black
TEXT_COLOR = (255, 255, 255)
ACCENT_COLOR = (120, 90, 240) # Nanobanana Purple

def create_base_image():
    img = Image.new('RGB', (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    
    # Draw simple gradient/glow
    for r in range(300, 0, -5):
        alpha = int(20 * (r/300))
        draw.ellipse([(WIDTH/2 - r, HEIGHT/2 - r), (WIDTH/2 + r, HEIGHT/2 + r)], fill=(40, 30, 80))
        
    return img

def create_daw_wars_image():
    img = create_base_image()
    draw = ImageDraw.Draw(img)
    
    # Try to use a font, fallback to default
    try:
        font_large = ImageFont.truetype("arial.ttf", 80)
        font_vs = ImageFont.truetype("arial.ttf", 60)
        font_small = ImageFont.truetype("arial.ttf", 40)
    except:
        font_large = ImageFont.load_default()
        font_vs = ImageFont.load_default()
        font_small = ImageFont.load_default()

    # Load Logos if possible (Handling SVGs is hard without cairosvg, so we use text as fallback if needed)
    # Since we downloaded some SVGs, we might need to convert them. 
    # For now, let's use the PNGs we have and TEXT for the others to ensure it works.
    
    # Text Implementation (Safest and cleanest "Cyberpunk" look)
    
    draw.text((WIDTH/2, 100), "DAW WARS 2026", fill=ACCENT_COLOR, font=font_large, anchor="mm")
    
    # Ableton
    draw.text((WIDTH/4, HEIGHT/2), "ABLETON", fill=(100, 200, 255), font=font_large, anchor="mm")
    
    # VS
    draw.text((WIDTH/2, HEIGHT/2), "VS", fill=(100, 100, 100), font=font_vs, anchor="mm")
    
    # Logic / FL
    draw.text((3*WIDTH/4, HEIGHT/2 - 60), "LOGIC PRO", fill=(255, 100, 100), font=font_small, anchor="mm")
    draw.text((3*WIDTH/4, HEIGHT/2 + 60), "FL STUDIO", fill=(255, 180, 50), font=font_small, anchor="mm")

    img.save("d:/Indirilenler/wbbt net/public/images/blog/blog-58.png")
    print("Created blog-58.png")

def create_ai_showdown_image():
    img = create_base_image()
    draw = ImageDraw.Draw(img)
    
    try:
        font_large = ImageFont.truetype("arial.ttf", 80)
        font_vs = ImageFont.truetype("arial.ttf", 50)
    except:
        font_large = ImageFont.load_default()
        font_vs = ImageFont.load_default()

    draw.text((WIDTH/2, 100), "AI SHOWDOWN", fill=(0, 255, 150), font=font_large, anchor="mm")
    
    # Positions
    draw.text((WIDTH/2, HEIGHT/2 - 100), "SUNO", fill=(255, 255, 255), font=font_large, anchor="mm")
    draw.text((WIDTH/2, HEIGHT/2), "VS", fill=(100, 100, 100), font=font_vs, anchor="mm")
    draw.text((WIDTH/2, HEIGHT/2 + 100), "UDIO", fill=(255, 255, 255), font=font_large, anchor="mm")

    img.save("d:/Indirilenler/wbbt net/public/images/blog/blog-59.png")
    print("Created blog-59.png")

def create_distro_image():
    img = create_base_image()
    draw = ImageDraw.Draw(img)
    
    try:
        font_large = ImageFont.truetype("arial.ttf", 70)
        font_sub = ImageFont.truetype("arial.ttf", 40)
    except:
        font_large = ImageFont.load_default()
        font_sub = ImageFont.load_default()

    draw.text((WIDTH/2, 100), "HIDDEN FEES", fill=(255, 50, 50), font=font_large, anchor="mm")
    
    draw.text((WIDTH/3, HEIGHT/2), "DISTROKID", fill=(255, 255, 255), font=font_sub, anchor="mm")
    draw.text((2*WIDTH/3, HEIGHT/2), "TUNECORE", fill=(255, 255, 255), font=font_sub, anchor="mm")
    
    draw.text((WIDTH/2, HEIGHT/2 + 100), "VS CD BABY", fill=(150, 150, 150), font=font_sub, anchor="mm")

    img.save("d:/Indirilenler/wbbt net/public/images/blog/blog-60.png")
    print("Created blog-60.png")

if __name__ == "__main__":
    create_daw_wars_image()
    create_ai_showdown_image()
    create_distro_image()
