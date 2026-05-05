import os
import re
from collections import defaultdict

img_dir = "images/products/"
files = os.listdir(img_dir)

# Group by timestamp prefix (Internet_YYYYMMDD_HHMMSS)
groups = defaultdict(list)
for f in files:
    if f.startswith("Internet_"):
        # Match prefix up to the last underscore before the sequence number
        match = re.match(r"(Internet_\d+_\d+)_", f)
        if match:
            prefix = match.group(1)
            groups[prefix].append(f)

for prefix, imgs in sorted(groups.items()):
    print(f"{prefix}: {len(imgs)} images -> {', '.join(sorted(imgs))}")
