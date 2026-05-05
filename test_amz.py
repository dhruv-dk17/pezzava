import json
import urllib.request
import re

url = "https://www.amazon.in/dp/B08KRNMDQN"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    matches = re.findall(r'https://m\.media-amazon\.com/images/I/[^"]+\.jpg', html)
    print("Found images:", list(set(matches))[:10])
except Exception as e:
    print(e)
