import os
import glob
import re

# Read the base header from index.html
with open('d:/pezzava/index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

header_match = re.search(r'(<header.*?</header>)', index_content, re.DOTALL)
base_header = header_match.group(1)

def update_header_in_file(filepath):
    filename = os.path.basename(filepath)
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We don't want to replace index.html's own header since it's already correct.
    # Wait, actually let's update index.html too so it gets the active state!
    
    # Make a copy of base_header to modify
    new_header = base_header
    
    # Determine which link should be active
    # filename could be index.html, about.html, etc.
    # Special cases:
    active_href = filename
    if filename == 'product.html':
        active_href = 'products.html' # product details belongs to Shop
    
    # Regex to find the desktop link for the active page
    # Look for `<a href="filename" class="font-body text-[12px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors relative group">...<span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>`
    
    desktop_link_pattern = re.compile(
        r'(<a href="' + re.escape(active_href) + r'".*?class="[^"]*)text-on-surface-variant hover:text-primary transition-colors([^"]*".*?<span.*?class="[^"]*)w-0(.*?group-hover:w-full)(".*?</span>)',
        re.DOTALL
    )
    
    # Update Desktop link
    match = desktop_link_pattern.search(new_header)
    if match:
        new_header = new_header[:match.start()] + match.group(1) + "text-primary font-bold" + match.group(2) + "w-full" + match.group(4) + new_header[match.end():]
        # remove group-hover:w-full since it's always full
        new_header = new_header.replace('w-full h-[1px] bg-primary transition-all duration-300 group-hover:w-full', 'w-full h-[1px] bg-primary transition-all duration-300')
    
    # Mobile link
    mobile_link_pattern = re.compile(
        r'(<a href="' + re.escape(active_href) + r'".*?class="[^"]*font-display text-4xl )text-on-surface hover:text-primary( transition-colors flex items-center justify-between group">)'
    )
    new_header = mobile_link_pattern.sub(r'\1text-primary\2', new_header)
    
    # Replace the existing header in the file
    content = re.sub(r'<header.*?</header>', new_header, content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated header in {filename}")

if __name__ == "__main__":
    for filepath in glob.glob('d:/pezzava/*.html'):
        update_header_in_file(filepath)
