import glob
import re
import os

files = glob.glob("d:/pezzava/*.html") + glob.glob("d:/pezzava/stitch_assets/*.html")

for fpath in files:
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    def replace_func(match):
        fb_link = match.group(0)
        # Extract the exact same string but change href and text
        li_link = fb_link.replace('https://www.facebook.com/pezzava/', 'https://www.linkedin.com/in/pezzava-jaipur-1850415b')
        li_link = li_link.replace('>Facebook</a>', '>LinkedIn</a>')
        
        return fb_link + "\n" + match.group(1) + li_link

    new_content = re.sub(r'(\s*)<a [^>]*href="https://www\.facebook\.com/pezzava/"[^>]*>Facebook</a>', replace_func, content)

    if new_content != content:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated {fpath}")
