# Portfolio — Marharyta Khursik

Plain HTML/CSS/JS, no build step. Open `index.html` or push to GitHub Pages.

## 1. Fonts (self-host)
    cd fonts && ./download-fonts.sh
Until you run it, fonts load from Google Fonts (Pixelify Sans, IBM Plex Sans, IBM Plex Mono).

## 2. Images
Paths match the old portfolio repo, so if you put this site into the same repo
(keeping the `images/` folder), everything loads automatically:

- `images/hero.jpg` — your photo
- `images/projects/<name>.jpg` — cogchain, cogchain-1, cogchain-2, detective, gallery, dzia, benchmark, leasing, flags, reversi
- `images/art/art-1.jpg … art-4.jpg` — already included (3D renders, sculpt, painting)

If a file is missing locally, the page tries the copy on marharytakh.github.io/portfolio,
then shows a hatched placeholder with the expected file name.

## 3. Edit text
All content is in `index.html`. Each project has `.desc--tech` and `.desc--plain` — the switch on the page toggles between them.
