# Suggested commands
- `rtk rg --files docs` to inspect the published website files.
- `rtk sed -n '1,220p' docs/index.html` to inspect homepage markup.
- `rtk sed -n '1,260p' docs/site.css` to inspect shared styling.
- `rtk node --check docs/site.js` to syntax-check the site script.
- `rtk git status --short docs` to review website edits.
- `rtk git diff -- docs/index.html docs/privacy.html docs/site.css docs/site.js` to inspect website changes.
- `rtk cp lattice_intro/<file> docs/assets/<file>` to copy publishable assets into the GitHub Pages tree.