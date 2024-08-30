#!/bin/bash

# List the directory as markdown
echo "# Directory Listing"
for file in $(ls); do
    echo "- $file"
done
