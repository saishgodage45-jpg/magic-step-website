# Website Setup and Deployment

## Local preview

The site is static HTML, CSS, and JavaScript. No dependency installation or build command is required. From the repository root, run:

```powershell
python -m http.server 8000
```

Then open <http://localhost:8000/> in a modern browser. Stop the local server with **Ctrl+C**. Three.js and Google Fonts are hosted remotely, so the interactive 3D explorer and web fonts require an internet connection.

## GitHub Pages

The repository already has GitHub Pages configured to publish the repository root (`/`) from the `main` branch using the existing branch-based configuration. The project does not need a second Actions deployment workflow, so none was added.

The updated site was verified live after this revision reached `main`. Future changes on a feature branch do not appear at the public URL until they reach the configured source and Pages completes a new build. Check the repository's Pages settings and deployment status for the current state.

Published site: <https://saishgodage45-jpg.github.io/magic-step-website/>

## Repository source

The root `index.html`, `assets/`, and `docs/` directories are the canonical Pages source. `magic_step_website/` is a retained mirror and is not the deployment source.
