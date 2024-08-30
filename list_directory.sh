#!/bin/bash

# List the directory as markdown
echo "# Directory Listing"
for file in $(ls); do
    if [[ -d $file ]]; then
        echo "- **$file**"
    elif [[ $file == *.txt || $file == *.md ]]; then
        echo "- *$file*"
    else
        echo "- $file"
    fi
done
