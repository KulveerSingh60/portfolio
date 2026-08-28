# Kulveer Singh — Developer Portfolio

A modern, premium **React + Vite + Three.js** portfolio with an interactive 3D hero experience.

**🔗 Live Demo:** [kulveersingh60.github.io/portfolio](https://kulveersingh60.github.io/portfolio)

---

## ✨ Highlights

- **Interactive 3D hero** — a stylized developer workstation (monitor, laptop, floating code panels) built with React Three Fiber & Three.js
- **Pointer-driven parallax** — the 3D scene reacts to mouse movement with natural, subtle camera rotation
- **Premium loading experience** — short "Initializing portfolio…" sequence that never blocks the page
- **Glassmorphism navigation** with active-section detection and a mobile menu
- **Editorial project showcase** — alternating 3D device mockups for each project with filtering
- **Live GitHub repos** — pulls real repositories from the GitHub API with graceful fallback
- **Dark, minimal, futuristic design** — Apple-style restraint with a subtle green/cyan accent
- **Fully responsive** on desktop, tablet and mobile

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 19 + Vite 6 |
| **3D** | Three.js, React Three Fiber, @react-three/drei |
| **Animation** | Framer Motion + CSS |
| **Icons** | lucide-react |
| **Typography** | Inter + JetBrains Mono |
| **Hosting** | GitHub Pages (base path `/portfolio/`) |

---

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/          # Loader, Navbar
│   │   └── 3d/              # HeroScene, HeroFallback, ProjectDevice
│   ├── sections/            # Hero, About, Statistics, Skills, Projects,
│   │                        # Experience, Certifications, GitHub, Contact, Footer
│   ├── data/index.js        # All real portfolio content
│   ├── hooks/               # useReveal, useMedia (WebGL / mobile detection)
│   ├── styles/components.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/                  # favicon.svg, og-image.svg
├── index.html               # SEO metadata
├── vite.config.js           # base '/portfolio/'
└── package.json
```

All real content (name, role, about, experience, education, skills, projects, certifications, statistics, contact, socials) lives in `src/data/index.js`.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Install & run
```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

---

## 🌐 Deploy to GitHub Pages

The Vite `base` is already set to `/portfolio/` so assets load correctly from `https://kulveersingh60.github.io/portfolio/`.

**Option A — GitHub Pages action (recommended):** push `main`; enable Pages to deploy from a branch/action.

**Option B — manual:** build then publish `dist/` to the `gh-pages` branch:
```bash
npm run build
npx gh-pages -d dist
```

> The contact form opens the visitor's email client with the message pre-filled (no backend required).

---

## ♿ Performance & Accessibility

- 3D is lazy-loaded and downgrades to a static code-window fallback when WebGL is unavailable
- Reduced 3D resolution on mobile devices and capped DPR
- `prefers-reduced-motion` disables animations
- Semantic HTML, proper heading hierarchy, focus states, and accessible controls
- Important content is always available outside the 3D scene

---

## 📝 License

MIT — see [LICENSE](LICENSE).

---

Made with ❤️ and code by Kulveer Singh · © 2026
