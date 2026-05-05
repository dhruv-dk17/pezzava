import json
import os

with open('data/products.json', 'r') as f:
    products = json.load(f)

for p in products:
    print(f"Product {p['id']}: {len(p['images'])} images")
    for img in p['images']:
        if not os.path.exists(img):
            print(f"  MISSING: {img}")
        else:
            # Check size
            if os.path.getsize(img) == 0:
                print(f"  EMPTY: {img}")
