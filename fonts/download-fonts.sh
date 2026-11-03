#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"
URL="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Pixelify+Sans:wght@400;600&display=swap"
curl -fsSL -A "$UA" "$URL" -o fonts.tmp.css
i=0
for u in $(grep -o 'https://fonts.gstatic.com[^)]*' fonts.tmp.css | sort -u); do
  i=$((i+1)); f="f$(printf '%02d' $i).woff2"
  curl -fsSL "$u" -o "$f"
  sed -i.bak "s|$u|$f|g" fonts.tmp.css
done
rm -f fonts.tmp.css.bak
mv fonts.tmp.css fonts.css
echo "Done: $i font files, fonts.css now self-hosted."
