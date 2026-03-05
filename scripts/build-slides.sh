#!/usr/bin/env sh

set -euo pipefail

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

    pushd "$dir" > /dev/null

    npm install
    npx slidev build --base "/slides/$TALK_NAME/" --out "../../$OUTPUT_DIR/$TALK_NAME"

    popd > /dev/null
  fi
done

echo "All slides built successfully."