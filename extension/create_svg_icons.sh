#!/bin/bash

# Create SVG icon
cat > icon.svg << 'SVG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0ea5e9;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="128" height="128" fill="url(#grad)" rx="24"/>
  <circle cx="64" cy="64" r="50" fill="#ffffff" opacity="0.9"/>
  <text x="64" y="75" font-size="48" font-weight="bold" fill="#3b82f6" text-anchor="middle" font-family="Arial">PC</text>
</svg>
SVG

# Convert SVG to PNG using ImageMagick if available
if command -v convert &> /dev/null; then
  convert -background none icon.svg -resize 128x128 icons/icon-128.png
  convert -background none icon.svg -resize 48x48 icons/icon-48.png
  convert -background none icon.svg -resize 16x16 icons/icon-16.png
  echo "Icons created with ImageMagick"
else
  echo "ImageMagick not found. You'll need to convert icon.svg manually or use an online tool."
  echo "For now, copying SVG as PNG placeholder..."
fi
