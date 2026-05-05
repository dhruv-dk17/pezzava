import json
import os

# Load existing products
with open('data/products.json', 'r') as f:
    products = json.load(f)

# List of prefixes for multi-angle images (from analysis)
amz_multi_prefixes = [
    "Internet_20260504_200016", # 4 images
    "Internet_20260504_200037", # 5 images
    "Internet_20260504_200057", # 4 images
    "Internet_20260504_200127", # 4 images
    "Internet_20260504_200150", # 6 images
    "Internet_20260504_200218", # 7 images
    "Internet_20260504_200245", # 4 images
    "Internet_20260504_200304", # 4 images
    "Internet_20260504_200338", # 5 images
    "Internet_20260504_200400"  # 4 images
]

img_dir = "images/products/"
all_files = os.listdir(img_dir)

def get_images_for_prefix(prefix):
    return sorted([f"images/products/{f}" for f in all_files if f.startswith(prefix)])

# Update Amazon products
amz_idx = 0
for p in products:
    if p['id'].startswith('amz-'):
        # Main image is usually 195959_X
        main_img = f"images/products/Internet_20260504_195959_{int(p['id'].split('-')[1])}.webp"
        p['images'] = [main_img]
        
        # If we have a multi-angle prefix for this product, add those images too
        if amz_idx < len(amz_multi_prefixes):
            multi_imgs = get_images_for_prefix(amz_multi_prefixes[amz_idx])
            # Merge, avoiding duplicates
            for m in multi_imgs:
                if m not in p['images']:
                    p['images'].append(m)
            p['prefix'] = amz_multi_prefixes[amz_idx]
            amz_idx += 1
        
        # Fallback if image doesn't exist on disk (though they should)
        p['images'] = [img for img in p['images'] if os.path.exists(os.path.join('', img))]
        if not p['images']:
            p['images'] = [main_img] # At least try the main one

# Save updated products
with open('data/products.json', 'w') as f:
    json.dump(products, f, indent=2)

print("Updated products.json with multi-angle images for Amazon products.")
