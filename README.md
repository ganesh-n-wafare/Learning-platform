# LearnSphere Dashboard

A responsive student learning dashboard built with React, Vite, Tailwind CSS, and JavaScript.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173/

## Deploy to GitHub Pages

1. Install the deployment package:

```bash
npm install gh-pages --save-dev
```

2. Update package.json with these scripts:

```json
"homepage": "https://<your-username>.github.io/<your-repo-name>",
"scripts": {
  "predeploy": "vite build",
  "deploy": "gh-pages -d dist"
}
```

3. Run:

```bash
npm run deploy
```

4. In GitHub, go to your repository settings and enable GitHub Pages.

5. Select the branch and folder used by the deployed site.

## Notes

- Replace `<your-username>` and `<your-repo-name>` with your real GitHub details.
- The deployed site will be available at:
  `https://<your-username>.github.io/<your-repo-name>/`
