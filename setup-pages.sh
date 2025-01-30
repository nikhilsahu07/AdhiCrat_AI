#!/bin/bash

# Define the base directory
BASE_DIR="src/pages"

# Find all .js files and rename them to .jsx
find "$BASE_DIR" -type f -name "*.js" | while read file; do
  mv "$file" "${file%.js}.jsx"
done

echo "✅ All .js files in $BASE_DIR have been renamed to .jsx!"
