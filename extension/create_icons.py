from PIL import Image, ImageDraw, ImageFont

# Create icons - using a simple gradient with "PC" text
def create_icon(size):
    # Create image with gradient background (blue to teal)
    img = Image.new('RGB', (size, size), color=(59, 130, 246))  # Blue base
    draw = ImageDraw.Draw(img)
    
    # Add a simple shape - circle with white center
    margin = size // 8
    draw.ellipse([margin, margin, size-margin, size-margin], fill=(255, 255, 255), outline=(30, 100, 200))
    
    return img

# Create all three sizes
sizes = {
    '128': 128,
    '48': 48,
    '16': 16
}

for name, size in sizes.items():
    icon = create_icon(size)
    icon.save(f'icons/icon-{size}.png')
    print(f'Created icon-{size}.png')
