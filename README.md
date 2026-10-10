# Professional Portfolio

A responsive portfolio showcasing AI/ML, Generative AI, and full-stack projects, with interactive constellations, custom animations, and a searchable project gallery.

## Live Website

**[View Portfolio](https://jitenkumarportfolio.netlify.app/)**

## Tech Stack

- React and TypeScript
- Vite
- Tailwind CSS and custom CSS
- Framer Motion
- React Router and Lucide React
- Netlify

## Run Locally

Use **Node.js 22.12+ in the 22.x release line**.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite.

## Build and Deploy

```bash
npm run build
npm run preview
```

For Netlify, use `npm run build` as the build command and `dist` as the publish directory. The configuration is included in `netlify.toml`.

## Content Updates

- Edit project details and image paths in `src/data/projects.ts`.
- WebP is the default image format. PNG is also supported: set a project's `previewImage` or its `workImages` paths to the PNG filename. Replacing a PNG does not automatically regenerate a separate WebP file.
- Replace `public/Jiten_Kumar_CV.pdf` to update the CV, then rebuild and deploy.

## Security

- No private API keys are required to run this portfolio.
- Never store secrets in frontend code or `public/`; these files are accessible to visitors. Keep private credentials server-side and do not commit `.env` files.
- Commit `package-lock.json`, but not `node_modules/` or `dist/`.
- Use `npm audit` to review dependency advisories. A successful build is not a security audit.

## Contact

[GitHub](https://github.com/Jiten28) · [LinkedIn](https://www.linkedin.com/in/jiten-kumar-85a03217a/) · [Email](mailto:work.jiten282003@gmail.com)
