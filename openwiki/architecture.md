# Site architecture

[Quickstart](quickstart.md) · [Publishing workflow](publishing-workflow.md) · [Source map](source-map.md)

## Runtime model

This is a GitHub Pages site made of committed HTML, CSS, images, and XML. There is no application server, package manifest, or build step: a content change is a direct edit to the public files and deploys when the repository is pushed. See [`CLAUDE.md`](../CLAUDE.md) for the project’s maintenance conventions.

## Public navigation

```text
index.html
├── cheatsheets/index.html ──► cheatsheets/<topic>.html
├── articles/index.html ────► articles/<slug>/<slug>.html
└── resume.html
```

- **Home (`index.html`)** is the dark, card-based landing page. It routes visitors to both libraries and has a hand-maintained **Latest from the site** list.
- **Cheatsheets** are concise standalone references. Their index lists files directly under `cheatsheets/`; their internal asset links are one directory below the root.
- **Articles** are long-form field notes. Every article has its own `articles/<slug>/` directory and local `demo_assets/`, so its root-level shared assets require `../../` links.
- **Discoverability** is explicit: `robots.txt` points crawlers to `sitemap.xml`; each public page owns its page metadata, while the blog index additionally exposes a `Blog` JSON-LD list.

## Editorial hierarchy

The article index has one `.featured-card` followed by the regular article grid. The current feature is FalkorDB. The home-page latest list is a separate curation surface, so promotion requires touching both indexes; details are in the [publishing workflow](publishing-workflow.md).

## Change boundaries

Keep reusable root assets at the root and article-specific images in that article’s `demo_assets/` directory. Because the site is not generated, paths, navigation, structured data, cards, and sitemap records do not reconcile automatically. For locations and ownership, consult the [source map](source-map.md).
