# Source map

[Quickstart](quickstart.md) · [Site architecture](architecture.md) · [Publishing workflow](publishing-workflow.md)

| Area | Main files | Purpose |
| --- | --- | --- |
| Landing page | [`index.html`](../index.html), [`style.css`](../style.css) | Public entrypoint, library navigation, and manually curated latest-content cards. |
| Blog | [`articles/index.html`](../articles/index.html), `articles/<slug>/<slug>.html`, `articles/<slug>/demo_assets/` | Article listing, featured hero, blog JSON-LD, long-form content, and article-local media. |
| Cheatsheets | [`cheatsheets/index.html`](../cheatsheets/index.html), `cheatsheets/*.html` | Listing and standalone data-science/developer reference pages. |
| SEO and crawlability | [`sitemap.xml`](../sitemap.xml), [`robots.txt`](../robots.txt) | Public URL/image inventory and the crawler route to it. |
| Other public page/assets | [`resume.html`](../resume.html), `omar.jpeg`, `github-gh.jpeg`, `github-gist.jpeg` | Resume and root-level assets reused by site pages. |
| Project guidance | [`CLAUDE.md`](../CLAUDE.md) | Canonical local conventions for structure, naming, SEO, and browser checks. |
| OpenWiki | [`openwiki/quickstart.md`](quickstart.md) and this directory | Generated maintenance documentation; begin at quickstart. |

For a new article’s coordinated edits, use the [publishing workflow](publishing-workflow.md), rather than treating this inventory as a checklist.
