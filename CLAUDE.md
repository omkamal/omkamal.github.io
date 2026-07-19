# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Omar Kamal Hosney's personal GitHub Pages site** at `https://omkamal.github.io` — a portfolio, cheatsheet library and blog covering data science, machine learning and AI tools.

**Key facts:**
- Static HTML site with no build process — edit files directly, push to deploy
- Author: Omar Kamal Hosney (LinkedIn: `/in/okhosney`, Medium: `@omkamal`)

## Site Structure

```
/                                  → New landing page (hero + cards for Cheatsheets and Blog)
/index.html                        → Landing page (dark-themed, modern design)
/resume.html                       → Resume
/robots.txt + /sitemap.xml         → SEO

/cheatsheets/                      → Cheatsheet section (second-level)
  /cheatsheets/index.html          → Cheatsheet listing page
  /cheatsheets/<topic>.html        → Individual cheatsheets (snake_case)

/articles/                         → Blog section (second-level)
  /articles/index.html             → Blog landing / article listing
  /articles/<slug>/<slug>.html     → Individual articles in their own subfolder
  /articles/<slug>/demo_assets/    → Article-specific images, diagrams etc.

/omar.jpeg, github-gh.jpeg, github-gist.jpeg → Shared root-level assets
```

## File Naming Conventions

- Cheatsheets: `snake_case.html` (e.g., `postgres_sql.html`, `numpy_cheatsheet.html`) — go in `/cheatsheets/`
- Presentations: `kebab-case.html` (e.g., `aider-presentation.html`) — go in `/cheatsheets/`
- Articles: each article lives in its own folder under `/articles/`, with a `kebab-case.html` name matching the folder
- Special pages: lowercase single word (e.g., `index.html`, `resume.html`)

## HTML Template Structure

### Cheatsheets
All cheatsheets use embedded CSS with a 3-column grid layout (`.container` class). Copy structure from `cheatsheets/docker.html` when creating new ones.

Key structural elements:
- `.container` — 3-column CSS Grid (`grid-template-columns: repeat(3, 1fr)`)
- `.section` — White card with rounded corners and shadow
- `.section-span-2` / `.section-span-3` — Multi-column spanning sections
- Author attribution: fixed position top-left/top-right or header container

Asset references from inside `/cheatsheets/` use `../` (e.g., `../omar.jpeg`).

### Landing page (`/index.html`)
Dark theme, animated gradient background, Inter font, hero + explore cards + latest + about + footer. Self-contained CSS in `:root` variables.

### Articles
Long-form Source Serif 4 / Inter typography. Each article in its own folder with `demo_assets/` for images.

## Development Workflow

No build process — edit HTML files directly, commit, push to main branch. GitHub Pages deploys automatically.

**Commit format:** Semantic commits (`feat:`, `fix:`, `docs:`, `style:`, `chore:`, `refactor:`)

## Adding New Cheatsheets

1. Create `cheatsheets/snake_case.html`, copying structure from `cheatsheets/docker.html`
2. Include relevant emoji in h1 title (e.g., 🐘 for PostgreSQL, 🐍 for Python)
3. Add entry to `cheatsheets/index.html` in the appropriate category:

```html
<li>
    <a href="filename.html">Cheatsheet Title</a>
    <p>Brief description of the cheatsheet content.</p>
</li>
```

4. Add an entry to `sitemap.xml`
5. Optionally feature the new cheatsheet in the "Latest from the site" section of `/index.html`

**Cheatsheet index categories:** Machine Learning, Large Language Models, Generative AI Agents, DevOps, GitHub Tools, Databases, Aider

## Adding New Articles

1. Create `articles/<slug>/<slug>.html` (e.g., `articles/my-new-article/my-new-article.html`)
2. Place article images in `articles/<slug>/demo_assets/`
3. Add entry to `articles/index.html`
4. Add an `<url>` entry to `sitemap.xml`
5. Feature in `/index.html` "Latest from the site" if newsworthy

## SEO

Every top-level / index / article page includes:
- `<title>`, `<meta name="description">`, `<meta name="keywords">`, canonical URL
- Open Graph + Twitter Card meta tags
- JSON-LD structured data (`Person`, `WebSite`, `Blog`, `Article`, `CollectionPage`, `BreadcrumbList`)

Maintain `sitemap.xml` and `robots.txt` at the root. Add new URLs to `sitemap.xml` when adding pages.

## External Resources

- **Google Fonts**: Inter, Poppins (landing/cheatsheets), Source Serif 4 (articles)
- **Font Awesome**: Icons via CDN (v6.4.0 on landing)
- **Author links**: LinkedIn (`/in/okhosney`), Medium (`@omkamal`), GitHub (`omkamal`)

## Testing

Open HTML files directly in browser. Verify:
- Landing page renders correctly on desktop and mobile (responsive grid breakpoints at 920px / 520px)
- Cheatsheet relative paths (`../omar.jpeg`, etc.) resolve
- Article images load from `demo_assets/`
- Navigation links between landing → cheatsheets/index → individual cheatsheet all work
