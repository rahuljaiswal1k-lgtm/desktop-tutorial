# Self-hosting fonts (optional)

The site loads Inter + Space Grotesk from Google Fonts with a system-font
fallback. To go fully offline / dependency-free, download the font files
into this folder and add @font-face rules at the top of assets/css/style.css,
then remove the Google Fonts <link> tags from each HTML page.
