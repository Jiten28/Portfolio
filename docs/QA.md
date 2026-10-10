# Local QA handoff

## Passed
- Production TypeScript/Vite build and structural project/asset check.
- 23 project records, with the requested ordering and all referenced local assets present.
- Voyage-AI tenth; Malware Detection sixth from the bottom; three featured projects match the top three.
- E-Commerce Website links to Sport Store; FounderPilot has its supplied demo link. The existing freelance-services website is referenced by a direct contact-area link, not a project card.
- Home, Projects, Skills, and CV at 1440×900 and 390×844.
- Page-level horizontal overflow checks also at 320×667, 768×1024, and 844×390.
- Exactly one semantic H1 and one main landmark per normal route; no nested anchor/button controls.
- No uncaught page JavaScript errors or failing local HTTP responses in the regression run.
- Search, GenAI filtering, reset, counts, and no-results state.
- Skills accordion activation using Enter and Space, with expanded state updates.
- Screenshot/image viewer opening, arrow navigation, Escape dismissal, and native modal focus behavior.
- Contact destinations use the supplied work email.
- PDF endpoint returns a PDF; previous image pagination replaced in v6 by the native embedded document.
- Skills → Projects navigation resets scroll; hash navigation reaches About.
- Legacy route aliases and useful unknown-route presentation.
- Original-style whole-word cursor reveal and fade-out; no pointer highlight on the name; reduced-motion/static mobile experience.
- Final featured-card/CTA gap measured at 64px in both tested reduced-motion layouts; animated desktop end state visually inspected separately.
- GitHub API failure fallback and normal mobile widget containment.
- Automated axe-core checks: zero reported violations on the four main routes at both primary widths, using WCAG 2 A/AA, WCAG 2.1 AA, and best-practice tags. This is not certification of full accessibility.
- Visual inspection of primary desktop/mobile routes and relevant reveal, accordion, viewer, empty, error, CV, and featured-card states. Focus-ring overlap found during inspection was fixed.
- Final npm audit: no known vulnerabilities reported for the installed dependency tree at handoff. Advisory databases change and this is not a penetration test.

## Not done / still verify
- No live deployment, domain change, mail sending, startup-analysis submission, or freelance contact submission.
- No comprehensive functional audit of linked external project applications.
- No independent verification of hackathon placement, historical project metrics, internship dates, or resume claims.
- No rewrite of the original PDF CV.
- No Lighthouse/Core Web Vitals benchmark; no claim of a measured speed score.
- No physical-device, Safari, or Firefox test.
- Netlify redirect behavior must be checked on staging; local BrowserRouter aliases were tested, not an actual Netlify deploy.
- Existing user-supplied illustrated gallery images were retained, not independently validated as real app screenshots.

## Latest customization restoration (v4)
- Removed the marked Projects subtitle and the CV HTML summary card; PDF remains unchanged.
- Restored scroll-linked About word reveal, original opposing tech rows and palettes, featured-card scale, social SVG-icon rotation/fill hover, and animated card borders.
- Cursor-reactive star/node connections and parallax restored with bounded viewport rendering.
- Whole-word scattered reveal tested near a keyword and away from it; name styling verified unchanged by pointer movement.
- Scroll tests confirmed About reveal and tech-row translation change with scrolling; social hover transform confirmed.
- FounderPilot landscape screenshot slot proportions verified at desktop/mobile widths; no image stretching.
- Original customization sources retained in reference/original-customizations, not shipped in the compiled website.
- No separate brand-logo file was found in the original supplied archive; added navbar text brand removed, original SVG interface icons retained.

## v5 header, constellations, and marquee
- Sparse varied constellation clusters, cursor proximity glow, anchor stars, and smooth parallax; fewer clusters on mobile, static reduced-motion mode.
- Sticky glass header centralized across routes; existing favicon image used as a JK home link; sliding focus/hover/active indicator.
- About anchor verified below the sticky header at 1440, 390, and 320 widths.
- Exactly two homepage Contact Me links verified.
- 21 unique technologies verified in reduced motion; animated mode uses two visual copies for looping and one unique accessible list.
- Automatic marquee movement verified; animation pauses off-screen and respects reduced motion.
- Current local regression: build, four routes at desktop/mobile, keyboard controls, search/filter/gallery/CV, overflow checks, and axe checks passed.
- Three JK logo concepts supplied separately; A uses the current favicon and is installed, B/C are previews only.
- Pause/resume control verified to stop automatic marquee translation.

## v6 single-file CV
- Actual PDF embedded using a native object viewer, with Open PDF/Download and unsupported-browser fallback.
- Removed generated CV page images and their asset-check requirements; no hardcoded page count.
- Future update: replace public/Jiten_Kumar_CV.pdf and deploy; no automatic sync from external documents.
- Netlify PDF cache header requests revalidation after updates. Not yet tested on a live Netlify deployment.
- Browser PDF internals and inline support differ; Open PDF is the reliable alternative. No claim of identical native viewer behavior on all mobile browsers.
- Added text line-ending rules and Windows/migration recovery notes.

## v7 navbar correction
- Replaced shared-layout underline with one persistent, locally positioned horizontal indicator.
- Resize/font measurement, focus/hover/active state, and reduced-motion behavior retained.
- Repeated Skills clicks and cross-route transitions tested from the bottom of long pages at 1440, 390, and 320 widths; animation frames checked for header containment and final link alignment.
- Removed unused portrait from active src; original asset preserved under reference. Cleanup guide included.
