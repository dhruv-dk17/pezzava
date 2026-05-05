import os
import glob

badge_html = """
  <!-- Verification Badge -->
  <div class="fixed bottom-8 right-8 z-[100] hidden md:block reveal-fade" style="transition-delay: 1s;">
    <a href="verification.html" class="flex items-center gap-3 bg-white/90 backdrop-blur-md border border-stone-200 py-3 px-5 rounded-full shadow-2xl hover:shadow-primary/20 hover:border-primary/50 transition-all group">
      <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
        <span class="material-symbols-outlined" style="font-size: 16px;">verified_user</span>
      </div>
      <div class="flex flex-col text-left">
        <span class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 leading-none mb-1">Official Portal</span>
        <span class="text-[12px] font-bold text-on-surface leading-none">Verify Internships</span>
      </div>
    </a>
  </div>
"""

def process_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    
    # 1. Add modern.css
    if 'css/modern.css' not in content:
        content = content.replace('</head>', '  <link rel="stylesheet" href="css/modern.css">\n</head>')

    # 2. Add modern.js
    if 'js/modern.js' not in content:
        if '<script src="js/app.js"></script>' in content:
            content = content.replace('<script src="js/app.js"></script>', '<script src="js/app.js"></script>\n  <script src="js/modern.js"></script>')
        else:
            content = content.replace('</body>', '  <script src="js/modern.js"></script>\n</body>')
            
    # 3. Add Verification Badge
    if 'Verification Badge' not in content:
        content = content.replace('</body>', badge_html + '\n</body>')

    # 4. Update Header class
    header_target = 'header class="fixed top-0 w-full z-50 transition-all duration-500 bg-white/80 backdrop-blur-sm py-6 md:bg-transparent md:backdrop-blur-none glass-morphism"'
    header_replacement = 'header class="fixed top-0 w-full z-50 transition-all duration-500 bg-white/80 backdrop-blur-sm py-6 md:bg-transparent md:backdrop-blur-none"'
    content = content.replace(header_target, header_replacement)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")
    else:
        print(f"No changes needed for {filepath}")

if __name__ == "__main__":
    for filepath in glob.glob('d:/pezzava/*.html'):
        process_html_file(filepath)
