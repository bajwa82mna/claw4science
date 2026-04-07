# Claw4Science — OpenClaw Ecosystem Directory

**Live site:** [claw4science.campusinchina.com](https://claw4science.campusinchina.com)

A curated discovery platform for OpenClaw AI agent projects — spanning bioinformatics, biomedicine, drug discovery, and multi-agent research systems.

## 🌐 Pages

| Page | Description |
|------|-------------|
| `index.html` | Home page — project directory with search & filter |
| `blog.html` | Blog posts and ecosystem guides |
| `skill-hubs.html` | Curated skill collections by domain |
| `about.html` | About the project, curation principles, contact |
| `404.html` | Custom 404 error page |
| `privacy.html` | Privacy policy |
| `terms.html` | Terms of service |

## 📁 Structure

```
/
├── index.html
├── blog.html
├── skill-hubs.html
├── about.html
├── 404.html
├── privacy.html
├── terms.html
├── CNAME                  ← custom domain config
├── _config.yml            ← GitHub Pages config
├── css/
│   └── style.css          ← all styles (dark bioluminescent theme)
└── js/
    ├── projects.js         ← project data (add new projects here)
    └── main.js             ← interactivity (nav, search, filter, FAQ)
```

## 🚀 Deployment (GitHub Pages)

1. **Create a GitHub repository** (e.g., `username/claw4science`)
2. **Push all files** to the `main` branch
3. **Enable GitHub Pages:** Settings → Pages → Source: `main` branch, root `/`
4. **DNS:** Add a CNAME record for `claw4science.campusinchina.com` → `username.github.io`
5. **Wait ~5 minutes** — your site is live!


GitHub Pages will automatically provision an SSL certificate via Let's Encrypt.

## ➕ Adding a New Project

Open `js/projects.js` and add an entry to the `PROJECTS` array:

```js
{
  id: "my-project",           // unique slug
  name: "MyProject",
  category: "bioinformatics", // see CATEGORIES for valid values
  categoryLabel: "Bioinformatics & Omics",
  stars: "1.2K",
  starsNum: 1200,             // used for sorting
  lang: "Python",
  langClass: "lang-python",
  badge: null,                // null or "new"
  icon: "🧬",                 // emoji icon
  desc: "Description here...",
  tags: ["tag1", "tag2"],
  links: [
    { label: "GitHub", url: "https://github.com/org/repo" }
  ]
}
```

### Valid categories:
`core` · `team` · `medical` · `bioinformatics` · `drug` · `research` · `workbench` · `papers` · `education` · `benchmark`

## 🎨 Design

- **Theme:** Bioluminescent Lab (dark navy background, teal/cyan accents)
- **Fonts:** Syne (headings) + Plus Jakarta Sans (body) + JetBrains Mono (code)
- **Features:** Responsive grid, live search, category tabs, FAQ accordion, particle animations
- **No build step** — pure HTML/CSS/JS, deploys directly via GitHub Pages

## 📄 License

Site content and code: MIT License  
Project data belongs to respective project creators.

---

Maintained by the Claw4Science community. Contributions welcome via Issues.
