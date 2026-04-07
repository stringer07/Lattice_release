#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BUNDLE_ID="com.aurelian.Lattice"

# Auto-detect port from Lattice preferences, fall back to default
SAVED_PORT=$(defaults read "$BUNDLE_ID" citationBridgePort 2>/dev/null || true)
PORT="${LATTICE_PORT:-${SAVED_PORT:-52731}}"
ORIGIN="http://127.0.0.1:$PORT"

LATTICE_CONTAINER="$HOME/Library/Containers/$BUNDLE_ID/Data"
PLUGIN_DIR="$LATTICE_CONTAINER/Library/Application Support/Plugins/word-addin"
WEF_DIR="$HOME/Library/Containers/com.microsoft.Word/Data/Documents/wef"

echo "=== Lattice Word Add-in Installer ==="
echo ""
echo "  Lattice port: $PORT"
echo "  Plugin path:  $PLUGIN_DIR"
echo ""

# Verify Lattice container exists
if [ ! -d "$LATTICE_CONTAINER" ]; then
    echo "Error: Lattice app container not found."
    echo "Please launch Lattice at least once before installing this plugin."
    echo ""
    exit 1
fi

# Copy plugin web files
echo "Copying plugin files..."
mkdir -p "$PLUGIN_DIR"
rm -rf "$PLUGIN_DIR/"*
cp -R "$SCRIPT_DIR/web/"* "$PLUGIN_DIR/"

# Generate and install manifest
echo "Installing Word manifest..."
mkdir -p "$WEF_DIR"
sed "s|__PUBLIC_ORIGIN__|$ORIGIN|g" "$SCRIPT_DIR/manifest-template.xml" > "$WEF_DIR/lattice-word-addin.manifest.xml"

echo ""
echo "Done!"
echo ""
echo "  1. Make sure Lattice is running with Local API enabled (port $PORT)."
echo "  2. Quit Word completely and reopen it."
echo "  3. The Lattice button will appear in the Home tab."
echo ""
echo "To use a different port, run:  LATTICE_PORT=12345 ./install.command"

# Return to interactive shell prompt
exec $SHELL
