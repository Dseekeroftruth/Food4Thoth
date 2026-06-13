#!/usr/bin/env bash
# ============================================================
# Food4Thoth WordPress Packager
# Creates installable ZIP files for the theme and plugin.
# Run from the /wordpress/ directory:
#   chmod +x package-for-wordpress.sh
#   ./package-for-wordpress.sh
# ============================================================
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT_DIR="$SCRIPT_DIR/dist"

echo "==> Cleaning dist directory..."
rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"

# ---- Package Theme ----
echo "==> Packaging food4thoth-theme..."
cd "$SCRIPT_DIR"
zip -r "$OUT_DIR/food4thoth-theme.zip" food4thoth-theme/ \
    --exclude "*.DS_Store" \
    --exclude "*/.git/*" \
    --exclude "*/node_modules/*"
echo "    Created: dist/food4thoth-theme.zip"

# ---- Package Plugin ----
echo "==> Packaging food4thoth-plugin..."
zip -r "$OUT_DIR/food4thoth-plugin.zip" food4thoth-plugin/ \
    --exclude "*.DS_Store"
echo "    Created: dist/food4thoth-plugin.zip"

echo ""
echo "✅ Done! Upload these files to WordPress:"
echo ""
echo "  1. Appearance → Themes → Upload Theme"
echo "     → dist/food4thoth-theme.zip"
echo ""
echo "  2. Plugins → Add New → Upload Plugin"
echo "     → dist/food4thoth-plugin.zip"
echo ""
echo "  3. Activate both, then go to:"
echo "     Food4Thoth (admin menu) → Create / Refresh All Pages"
echo ""
echo "  4. Settings → Reading → Set 'Home' as front page"
echo ""
