# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Omar Kamal Hosney's personal GitHub Pages site** at `https://omkamal.github.io` - a portfolio and collection of technical cheatsheets for data science, machine learning, and AI tools.

**Key facts:**
- Static HTML site with no build process - edit files directly, push to deploy
- ~30 HTML files including cheatsheets, resume, and index page
- Author: Omar Kamal Hosney (LinkedIn: `/in/okhosney`)

## File Naming Conventions

- Cheatsheets: `snake_case.html` (e.g., `postgres_sql.html`, `numpy_cheatsheet.html`)
- Presentations: `kebab-case.html` (e.g., `aider-presentation.html`)
- Special pages: lowercase single word (e.g., `index.html`, `resume.html`)

## HTML Template Structure

All cheatsheets use embedded CSS with a 3-column grid layout (`.container` class). Copy structure from existing cheatsheet like `docker.html` when creating new ones.

Key structural elements:
- `.container` - 3-column CSS Grid (`grid-template-columns: repeat(3, 1fr)`)
- `.section` - White card with rounded corners and shadow
- `.section-span-2` / `.section-span-3` - Multi-column spanning sections
- Author attribution: fixed position top-left/top-right or header container

**Note:** CSS varies between files - some use CSS custom properties (`:root` variables), others use inline values. Match the style of nearby files or use modern CSS variables approach (see `docker.html`).

## Development Workflow

No build process - edit HTML files directly, commit, and push to main branch. GitHub Pages deploys automatically.

**Commit format:** Semantic commits (`feat:`, `fix:`, `docs:`, `style:`, `chore:`)

## Adding New Cheatsheets

1. Create `snake_case.html` file, copying structure from `docker.html`
2. Include relevant emoji in h1 title (e.g., 🐘 for PostgreSQL, 🐍 for Python)
3. Add entry to `index.html` in appropriate category:

```html
<li>
    <a href="filename.html">Cheatsheet Title</a>
    <p>Brief description of the cheatsheet content.</p>
</li>
```

**index.html categories:** Machine Learning, Large Language Models, Generative AI Agents, DevOps, Databases, Aider

## External Resources

- **Google Fonts**: Poppins, Inter, Roboto (varies by file)
- **Font Awesome**: Icons via CDN
- **Author links**: LinkedIn (`/in/okhosney`), Medium (`@omkamal`)
- **index.html widgets**: Payhip embed, Amazon affiliate book links

## Testing

Open HTML files directly in browser. Check responsive layout and print preview for cheatsheets.
