import json
import urllib.request
import re
import os
import time

with open("data/products.json", "r") as f:
    products = json.load(f)

if not os.path.exists("images"):
    os.makedirs("images")
if not os.path.exists("images/products"):
    os.makedirs("images/products")

for p in products:
    amz_url = p["marketplace"]["amazon"]
    if amz_url and not p["images"]:
        try:
            req = urllib.request.Request(amz_url, headers={'User-Agent': 'Mozilla/5.0'})
            html = urllib.request.urlopen(req).read().decode('utf-8')
            match = re.search(r'"large":"(https://m\.media-amazon\.com/images/I/[^"]+\.jpg)"', html)
            if match:
                img_url = match.group(1)
                img_name = f"images/products/{p['id']}.jpg"
                urllib.request.urlretrieve(img_url, img_name)
                p["images"] = [img_name]
                print(f"Downloaded {img_name} for {p['id']}")
            else:
                print(f"No image found for {p['id']} at {amz_url}")
        except Exception as e:
            print(f"Error fetching {amz_url}: {e}")
        time.sleep(1) # Be nice to Amazon

with open("data/products.json", "w") as f:
    json.dump(products, f, indent=2)
