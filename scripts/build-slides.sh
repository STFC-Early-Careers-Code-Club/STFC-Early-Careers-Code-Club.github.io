#!/usr/bin/env sh

set -eu

SLIDEV_DIR="slidev-src"
OUTPUT_DIR="public/slides"

rm -rf "$OUTPUT_DIR"

mkdir -p "$OUTPUT_DIR"

for dir in "$SLIDEV_DIR"/*; do
  if [ -d "$dir" ] && [ -f "$dir/package.json" ]; then
    TALK_NAME=$(basename "$dir")
    echo "-----------------------------------------"
    echo "Building slides for: $TALK_NAME"
    echo "-----------------------------------------"

    (
      cd "$dir"
      rm -rf node_modules
      npm install
      npx @slidev/cli build --base "/slides/$TALK_NAME/" --out "../../$OUTPUT_DIR/$TALK_NAME"
    )
  fi
done

echo "All slides built successfully."