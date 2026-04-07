#!/bin/bash
set -e

BUNDLE_ID="com.aurelian.Lattice"
LATTICE_CONTAINER="$HOME/Library/Containers/$BUNDLE_ID/Data"
PLUGIN_DIR="$LATTICE_CONTAINER/Library/Application Support/Plugins/word-addin"
WEF_DIR="$HOME/Library/Containers/com.microsoft.Word/Data/Documents/wef"
MANIFEST="$WEF_DIR/lattice-word-addin.manifest.xml"

echo "=== Lattice Word Add-in Uninstaller ==="
echo ""

if [ -d "$PLUGIN_DIR" ]; then
    echo "Removing plugin files..."
    rm -rf "$PLUGIN_DIR"
fi

if [ -f "$MANIFEST" ]; then
    echo "Removing Word manifest..."
    rm -f "$MANIFEST"
fi

echo ""
echo "Done! Please restart Word."

# Return to interactive shell prompt
exec $SHELL
