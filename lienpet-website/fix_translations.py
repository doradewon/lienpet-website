#!/usr/bin/env python3

# Read the file
with open('src/i18n/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the position where the file is truncated
# Look for the incomplete Russian contact section
lines = content.split('\n')
last_valid_line = -1
for i, line in enumerate(lines):
    if i >= 1380 and 'contact:' in line:
        # Found the start of contact section in Russian
        # We need to remove from here to the end and add the proper closing
        last_valid_line = i - 1
        break

if last_valid_line >= 0:
    # Keep content up to the last valid line
    fixed_content = '\n'.join(lines[:last_valid_line + 1]) + '\n'
    
    # Add the proper closing for the Russian section
    closing = '''    contact: {
      title: 'Связаться с нами',
      subtitle: 'Свяжитесь с нами',
      email: 'Email'#!/usr/bin/env python3

# Read the file
with open('s
# Read the file
with   with open('":     content = f.read()

# Find the position where the file is truncated
# Look for the inт
# Find the position с? Look for the incomplete Russian contact sect??ines = content.split('\n')
last_valid_l??ast_valid_line = -1
for i, line hatfor i, line in enumch    if i >= 1380 and 'c',        # Found the start of contact section insa        # We need to remove from here to the end and a }        last_valid_line = i - 1
        break

if last_valid_line >= 0:
  ??       break

if last_valid_lit
if last_val? ?   # Keep content up tо    fixed_content = '\n'.join(linesь    
    # Add the proper closing for the Russian section
    closing = '' ?   ?   closing = '""''" contact: {