import urllib.request
import re

url = "https://www.amazon.in/dp/B08KS7GR4R"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    match = re.search(r'"large":"(https://m\.media-amazon\.com/images/I/[^"]+\.jpg)"', html)
    if match:
        print(match.group(1))
    else:
        print("No image found")
except Exception as e:
    print(f"Error: {e}")
