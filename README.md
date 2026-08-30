<div align="center">

# Kulveer Singh

### Full-Stack Developer

> Building practical, responsive, and well-crafted digital experiences — turning ideas into functional products.

[**🔗 Live Portfolio**](https://kulveersingh60.github.io/portfolio) &nbsp;·&nbsp; [**💻 GitHub Profile**](https://github.com/KulveerSingh60)

</div>

---

## 👋 About

Full-stack web developer focused on building real-world applications with **PHP, MySQL, and JavaScript** — clean, responsive, and built to perform. I work across the full development lifecycle, from planning and design through implementation, testing, and deployment.

I have combined internship experience in full-stack web development, digital marketing, and business computing, and enjoy turning ideas into shipped products while steadily sharpening my craft. I'm completing my **BCA** and bring a practical, project-first approach to everything I build.

---

## ✨ Portfolio Highlights

| Feature | Description |
|---|---|
| 🧊 **Interactive 3D hero** | A stylized developer workstation (monitor, laptop, floating code panels) built with React Three Fiber & Three.js, with pointer-driven parallax |
| 💼 **Project showcase** | Editorial project rows with device mockups, **gallery & list** views, and filters (PHP / MySQL / JavaScript / WordPress) plus deep-dive case-study modals |
| 🗂️ **Live GitHub repos** | Pulls real repositories from the GitHub API with a graceful offline fallback |
| ✉️ **Contact system** | A working contact form powered by **Formspree** (no backend to run) |
| 🎧 **UI sound** | Optional, opt-in click sounds using the Web Audio API — no audio files, persisted in local storage |
| 📦 **Sectioned architecture** | Modular React components, per-section error boundaries, lazy-loaded 3D scene |
| 🧹 **Code splitting** | `three` and `motion` bundled into separate chunks to keep the main bundle lean |

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Frontend** | React 19, Vite 6, CSS3 |
| **3D** | Three.js, React Three Fiber, @react-three/drei |
| **Animation** | Framer Motion |
| **Icons** | lucide-react |
| **Typography** | Inter, JetBrains Mono |
| **Backend / Data** | PHP, MySQL, AJAX (project stack) |
| **Contacts** | @formspree/react |
| **Workflow** | Git & GitHub, Responsive Design |

---

## 🎨 Design & Experience

A **dark, editorial, futuristic** aesthetic with a subtle green/cyan accent palette.

- **Polished micro-interactions** — smooth 150–250ms hover transitions, subtle lifts, and pointer-driven 3D parallax
- **Fully responsive** — layouts adapt cleanly across desktop, tablet, and mobile breakpoints (1024 / 820 / 640)
- **Accessible** — semantic HTML, logical heading hierarchy, visible focus states, and proper tab/aria patterns
- **Reduced motion** — all animations are disabled for users who prefer reduced motion
- **Custom cursor** — replaced with a lightweight accent cursor, hidden automatically on touch devices

---

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── 3d/                 # HeroScene, HeroFallback, ProjectDevice, TechCore
│   │   ├── AboutTabs.jsx       # PROFILE / EDUCATION / EXPERIENCE / FOCUS tabs
│   │   ├── Cursor.jsx          # Custom accent cursor
│   │   ├── Loader.jsx          # Intro loading sequence
│   │   ├── Marquee.jsx         # Tech word marquee
│   │   ├── Navbar.jsx          # Glass nav + mobile menu + sound toggle
│   │   ├── SectionBoundary.jsx # Per-section error boundary
│   │   ├── SectionHead.jsx     # Section headers
│   │   └── SoundToggle.jsx     # Opt-in UI sound control
│   ├── sections/
│   │   ├── Hero.jsx            # Intro + 3D scene + marquee
│   │   ├── About.jsx           # About tabs, stats, facts, certifications
│   │   ├── Expertise.jsx       # Skills + process
│   │   ├── Projects/           # Gallery/list + CaseStudy modal
│   │   ├── Experience.jsx      # Work & education timeline
│   │   ├── Lab.jsx             # Experiments
│   │   ├── GitHub.jsx          # Live repo cards
│   │   ├── Contact.jsx         # Formspree form + contact links
│   │   └── Footer.jsx
│   ├── data/index.js           # All real portfolio content
│   ├── hooks/                  # useClickSound, useMedia (WebGL / mobile)
│   ├── lib/sound.js            # Web Audio click sounds
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/                     # favicon.svg, og-image.svg
├── index.html                  # SEO + Open Graph metadata
├── vite.config.js              # base '/portfolio/', code-splitting
├── .github/workflows/deploy.yml
└── package.json
```

---

## 📄 Portfolio Sections

- **Hero** — name, tagline, call-to-actions, and the interactive 3D background
- **About** — tabbed intro: PROFILE · EDUCATION · EXPERIENCE · FOCUS, plus stats and certifications
- **Expertise** — full-stack skill set (frontend, backend & data, tools, CMS) and development process
- **Projects** — filterable gallery and list views with case-study details
- **Experience** — work and education timeline
- **Lab** — experiments and prototypes
- **GitHub** — live snapshot of repositories from the GitHub API
- **Contact** — Formspree-powered form and direct links

---

## ⚡ Performance & Accessibility

- **WebGL fallback** — the 3D scene gracefully downgrades to a static code-window when WebGL isn't available
- **Lazy loading** — the heavy 3D scene is loaded on demand, so the page stays fast to first paint
- **Mobile optimization** — reduced 3D resolution and capped device-pixel-ratio on mobile
- **Code splitting** — `three` and `motion` split into their own chunks
- **Reduced motion** — honors `prefers-reduced-motion`
- **Accessible controls** — keyboard-focusable controls, ARIA roles on tabs/menu, and the custom cursor hidden on coarse pointers

---

## 🚀 Getting Started

```bash
npm install      # install dependencies
npm run dev      # start the local dev server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # preview the production build (http://localhost:4173)
```

> Requires Node.js 20+ and npm.

---

## 🌐 Deployment

The portfolio is deployed to **GitHub Pages** with **GitHub Actions**.

- Vite `base` is set to `/portfolio/`, so assets load correctly from `https://kulveersingh60.github.io/portfolio/`
- Pushing to `main` (or triggering the workflow manually) runs the deployment pipeline in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
  1. Checkout + set up Node.js 20
  2. `npm ci`
  3. `npm run build`
  4. Upload `dist` as a Pages artifact
  5. Deploy the artifact to Pages

The `dist` output is git-ignored; the published site is generated entirely by the build pipeline.

---

## ✉️ Contact

Use the **contact form** on the live site — it's powered by [Formspree](https://formspree.io) via `@formspree/react` and delivers messages directly to the inbox without any backend code. You can also reach me through:

- **GitHub:** [KulveerSingh60](https://github.com/KulveerSingh60)
- **LinkedIn:** [Kulveer Singh](https://www.linkedin.com/in/kulveer-singh-/)

---

## 📝 License

Distributed under the [MIT License](LICENSE). © 2026 Kulveer Singh.

---

<div align="center">

**Built with 🖤 and code — Kulveer Singh · Full-Stack Developer**

</div>
