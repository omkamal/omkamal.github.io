# omkamal.github.io — OpenWiki quickstart

## What this repository is

This is Omar Kamal Hosney’s GitHub Pages site: a static HTML portfolio with two content libraries:

- **Cheatsheets** — concise data-science and developer references under [`/cheatsheets/`](../cheatsheets/).
- **Blog articles** — long-form AI, ML, database, and tooling field notes under [`/articles/`](../articles/).

There is **no build step**. GitHub Pages deploys the committed static files; change the relevant HTML and supporting assets directly. The repository guidance in [`CLAUDE.md`](../CLAUDE.md) is the primary maintenance reference.

## Navigate the wiki

- [Site architecture](architecture.md) — static-site structure, navigation layers, and change boundaries.
- [Publishing an article](publishing-workflow.md) — add an article, make it the blog hero, promote it on the homepage, and index it.
- [Source map](source-map.md) — main public sections and their source files.

## Current featured content

The latest feature is **“FalkorDB, explained: the graph database that's secretly linear algebra”** at [`articles/falkordb-explained/falkordb-explained.html`](../articles/falkordb-explained/falkordb-explained.html). It is deliberately an illustrated, jargon-light explainer rather than an application integration guide.

Its source establishes these editorial claims:

- FalkorDB uses a **property graph** model: labelled, property-bearing nodes and typed, directed relationships with properties.
- The article explains its performance model as **sparse adjacency matrices** per relationship type, with graph patterns compiled to GraphBLAS-backed sparse matrix operations.
- It presents FalkorDB as a Redis module started through Docker, queried with **openCypher**, and paired with a browser on port 3000.
- Its AI/RAG angle is a native vector index: embeddings remain properties on graph nodes, so semantic retrieval can be followed by relationship traversal.

The article’s figures are local to [`articles/falkordb-explained/demo_assets/`](../articles/falkordb-explained/demo_assets/). Keep those relative references intact when moving or copying an article.

## Content publishing

Use [Publishing an article](publishing-workflow.md) for the coordinated article, hero, homepage, and sitemap changes. It uses the FalkorDB promotion as the current source-grounded reference.

Cheatsheets are standalone HTML pages with snake_case names in [`cheatsheets/`](../cheatsheets/). Their listing lives at [`cheatsheets/index.html`](../cheatsheets/index.html). Follow the established three-column embedded-CSS pattern described in [`CLAUDE.md`](../CLAUDE.md) and update the sitemap for new public pages.

## Change safely

- Keep article assets beside their article in `demo_assets/`; article URLs and asset URLs are intentionally explicit in metadata and sitemap entries.
- Preserve the site’s relative-link depth: article pages refer back to root-level assets with `../../`, while article-index cards resolve within `articles/`.
- Do not assume a generator will reconcile metadata, listing cards, homepage promotion, and the sitemap. They are manually maintained source files.
- Review uncommitted changes before editing. At the time this wiki was created, `CLAUDE.md` and repository automation/instruction files were uncommitted and were not part of the documented FalkorDB feature.

## Verification

Open the changed HTML locally in a browser and verify:

- The article and all `demo_assets/` images load.
- Navigation works from home → blog index → article and back.
- The blog featured card and homepage latest card target the intended article.
- Canonical/OG/JSON-LD URLs use the final public article path.
- `sitemap.xml` contains the article URL and referenced image URL.

There is no repository test or build command documented in the inspected source. Browser checks and link/asset validation are the relevant release checks for content edits.

## Backlog

- **Repository automation** — [`.github/workflows/`](../.github/workflows/): present as uncommitted source at this update; deferred until its workflow definition is stable and can be documented from committed evidence.
