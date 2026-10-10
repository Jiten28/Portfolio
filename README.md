# Jiten Kumar — updated titanium portfolio

An updated, tested copy of the supplied portfolio. The original archive was not changed. The live portfolio has not been redeployed by this update.

## Run locally

Use **Node.js 22.12 or newer in the 22.x line** (Netlify is configured for Node 22).

```bash
npm ci
npm run check
npm run dev
```

Open the local URL printed by Vite. No private API keys or environment variables are required for the portfolio.

## Production build

```bash
npm run build
npm run preview
```

The build is in `dist/`. `npm run check` verifies project records and all referenced local project/CV assets. It is a structural check, not a replacement for browser testing.

## Deployment

### Connected Git repository

Commit the source files, not `node_modules/` or `dist/`. Connect the repository to the existing Netlify site. The supplied `netlify.toml` sets:
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `22`

### Manual upload

The separate **Portfolio-netlify-v3.zip** contains the production site, with `index.html` at its root. Extract it and upload the folder containing that `index.html` to Netlify's manual deployment flow. Do not upload the source folder as a static website.

### Verify on staging before replacing the live site

Check Home, Skills, Projects, CV, direct refreshes, `/about`, `/project`, `/resume`, a nonexistent URL, the email links, the PDF, and important demos. BrowserRouter aliases cover local preview; Netlify's `_redirects` provides production redirects and SPA fallback. A platform-level fallback serves unknown paths with HTTP 200; the app still displays a useful 404 page. A server-rendered true HTTP 404 would require a different hosting/router setup.

The canonical and social URLs retain the existing `https://jitenkumarportfolio.netlify.app` address. If using another hostname, update `index.html`, `src/components/RouteEffects.tsx`, `public/robots.txt`, `public/sitemap.xml`, and regenerate `public/og-image.png` if its printed URL should change. Social bots may use only the initial HTML metadata; route-specific rich share cards require prerendering/SSR.

## What changed

- Shared project data now lives in `src/data/projects.ts`; both homepage and gallery use it.
- 23 projects. AgriVision-XAI, Cindrix-AI, and FounderPilot AI are the featured three.
- Voyage-AI is tenth; Malware Detection is eighteenth, sixth from the bottom.
- FounderPilot includes the Hacklabify sixth-place result and the user's contribution: frontend plus selected AI features. Its screenshots were captured from the public demo, without submitting startup data.
- Added the Sport Store deployment to E-Commerce Website.
- Added one direct Freelance Website link near Contact Me to the existing supplied website. No freelance website was created, recreated, or modified, and it is not a project card.
- About is rewritten as readable, naturally wrapping paragraphs.
- Original-style scattered whole-word cursor reveal highlights 11 role and technology phrases; name highlighting and project-code snippets are removed. It uses motion values, not a React state update per pointer movement. Identity and role are always visible. Touch/reduced-motion modes do not rely on the reveal.
- Fixed contact links, nested interactive controls, legacy URLs, scroll reset/hash jumps, and unknown-route presentation.
- Featured cards use content-based flow; sticky presentation is limited to sufficiently large screens and disabled for reduced motion. The final CTA has separation from the last card.
- Added screenshot lightboxes with native dialog focus handling, Escape dismissal, and keyboard previous/next navigation.
- Added gallery search, category filters, counts, and an empty state.
- Skills accordion uses real buttons, expanded states, hidden collapsed panels, and visible focus.
- Original scroll-linked About text, opposing full-tech marquee rows, featured-card scaling, and social-icon rotation/glow are preserved with reduced-motion alternatives. The marquee shows 21 unique technologies; a second visual copy only enables a seamless loop, while reduced motion shows each once.
- Sparse constellation-shaped neural connections replace the dense mesh, with cursor glow and subtle parallax.
- Contact Me appears twice on the homepage: hero and footer; the About duplicate is removed.
- FounderPilot screenshots use landscape-proportioned slots without distortion.
- The sticky glass header uses the existing JK favicon in a brass/graphite frame, with a sliding navigation indicator. Existing SVG interface icons are kept.
- CV page embeds the actual PDF with browser-native controls where supported, plus Open PDF/Download and fallback text. No image previews or hardcoded page count.
- Retained existing user-supplied gallery artwork and added real FounderPilot captures. Existing illustrated previews should be replaced with real app screenshots when available; they are labeled as project previews, not verified screenshots.
- Converted screenshots/preview images to WebP, lazy-loaded below-fold images, split secondary route/calendar code, removed the blocking preloader, and limited background drawing to a viewport canvas that pauses when hidden and becomes static for reduced motion.
- GitHub stats have caching, timeout/failure handling, repository pagination, and no duplicate contribution-count fetch. The calendar is labeled for the last 12 months.
- Added favicon, share card, descriptions, canonical links, robots/sitemap, and Netlify deployment settings.
- Updated Vite, React Router, and Tailwind/PostCSS, with the lockfile included. Automated npm audit reported no known vulnerabilities at handoff; this is not a security guarantee.

## Content you should verify separately

- The original PDF CV is preserved byte-for-byte. FounderPilot was added to the projects, **not to the PDF**. To update the CV, replace `public/Jiten_Kumar_CV.pdf` and redeploy. The embedded viewer, Open PDF, and Download all use that one file; no image conversion or page-count edits are needed. Browser-native PDF embedding varies, especially on mobile; Open PDF remains available. Editing a different local or cloud file does not update the website until this file is replaced and deployed.
- Selected unexplained performance/engagement percentages were removed from website project descriptions. Restore them only with evaluation context/evidence. The original PDF still contains its original claims.
- Internship dates and the original experience text were retained; review any “Developing”/“Enhancing” wording for roles that have ended.
- Nimbus/Cindrix and MediVerse/Wonderful Crown naming should be clarified if they refer to renamed or separate projects.
- The Hacklabify achievement and personal contribution are based on the user's supplied information, not independent competition verification.

## Tests and limits

A successful build, automated accessibility audit, and local browser checks do not guarantee every external demo's functionality or replace testing on actual devices and the deployment host.

## Windows install recovery / migrating the old repository
If `npm ci` fails with EPERM on a native Lightning CSS file, stop the portfolio dev server/build processes, close tools using this project, and retry. If still locked, restart Windows. Then remove only the project’s `node_modules` and run `npm ci` again. Do not delete the lockfile or disable antivirus. Use the documented Node 22.x environment. The subsequent missing-TypeScript error can be a consequence of the incomplete install.

Use a clean copy of this release’s `src` and `public` folders, rather than merging old Create React App source and unused custom TSX files into it. Back up your existing repository first and keep `.git`. Old CRA `public/index.html` and `.js` app entries are replaced by root `index.html`, `src/main.tsx`, and `src/App.tsx`. Review deletions and untracked additions together before committing. Never commit `node_modules`, `dist`, local env files, or downloaded ZIPs.

## Latest navbar and real screenshot update (v8)

- Navbar underline fades in place beneath each link. No shared-layout animation, position measurement, or cross-link travel.
- FounderPilot: fresh captures from https://founderpilot-ai-frontend.onrender.com/ (home, input form, feature section). No startup analysis was submitted.
- CrowdPulse: real initial-interface capture from https://crowdpulse-70bq.onrender.com/. The repository sample CSV upload returned a network error; no populated dataset or AI response was fabricated.
- Legal AI Assistant: fresh live capture from https://jiten-legal-ai-assistant.streamlit.app/ after waking the app. No legal document or AI request was submitted.
- BizLink: actual screenshots published in https://github.com/Jiten28/BizLink (landing, onboarding, dashboard). The published Vercel deployment was unavailable; these are not fresh live captures.
- Gallery supports additional genuine images for FounderPilot and BizLink. Captions distinguish live captures, repository images, and the empty CrowdPulse state.
- Project descriptions/providers are unchanged pending confirmation: current CrowdPulse is CSV/GenAI operations rather than the existing CV/deep-learning description; Legal UI shows OpenAI rather than the existing Gemini description.
- This source release does not reintroduce docs/, reference/, or public/cv-pages/. Original sources remain in prior release archives if needed.

### Keep / remove
Keep the current src/, public/ assets including Jiten_Kumar_CV.pdf, scripts/, root index.html, package files and configurations. tailwind.config.js is referenced by index.css. Keep .git when replacing your working files.
Old public/cv-pages images, duplicate release ZIPs, logs, and generated dist/ or *.tsbuildinfo can be removed; node_modules is generated but requires npm ci if removed. Do not delete src/pages/CVPage.tsx. Copy clean source folders rather than merging obsolete components.
