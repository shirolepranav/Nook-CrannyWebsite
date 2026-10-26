# Nook & Cranny — website

The marketing site for Nook & Cranny: Home Inventory, for iPhone and iPad. Plain HTML, CSS and JS with no build step, no dependencies and no third-party requests (fonts are self-hosted).

- **Deploy:** Vercel → Add New Project → import this repo → Framework preset **Other**, no build command, output directory `.`
- **Go live:** when the app is on the App Store, set `APP_STORE_URL` at the top of `main.js`. The "Coming soon" buttons become download links.
- **Preview locally:** `python3 -m http.server` in this folder, then open http://localhost:8000

Fraunces is © The Fraunces Project Authors, under the SIL Open Font License (`assets/fonts/OFL.txt`).
