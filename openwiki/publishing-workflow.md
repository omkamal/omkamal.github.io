---
type: Playbook
title: Publishing an article
description: Step-by-step workflow for adding a new article or cheatsheet to the site, covering metadata, demo assets, index entries, and sitemap updates.
tags: [workflow, publishing, articles, seo]
---

# Publishing an article

[Quickstart](quickstart.md) · [Site architecture](architecture.md) · [Source map](source-map.md)

## 1. Create the article and its metadata

Create `articles/<slug>/<slug>.html` and keep article-only visuals in `articles/<slug>/demo_assets/`. Follow an existing article’s structure: it carries its own title, description, canonical URL, Open Graph/Twitter image metadata, JSON-LD `Article`, and navigation. From this depth, root shared assets use `../../`; local images use `demo_assets/...`.

Use the final public path consistently in canonical, social, and structured-data URLs. The current FalkorDB article is a complete reference: [`articles/falkordb-explained/falkordb-explained.html`](../articles/falkordb-explained/falkordb-explained.html).

## 2. List and optionally make it the blog hero

Update [`articles/index.html`](../articles/index.html) in two places:

1. Prepend a `BlogPosting` entry to the `blogPost` JSON-LD array.
2. Add a regular article card to the grid.

To make it the blog hero, replace the single `.featured-card` target, image, label, metadata, and summary; move the previously featured article into the regular grid. The feature is manual editorial curation, not a date-derived result.

## 3. Promote it on the home page

If the article should appear among the homepage’s recent highlights, add or reposition its card in the **Latest from the site** list in [`index.html`](../index.html). Blog-hero status and homepage inclusion are independent decisions, though the current FalkorDB promotion does both.

## 4. Index it

Add an `<url>` entry to [`sitemap.xml`](../sitemap.xml), including the public article URL, date, and hero-image record when available. `robots.txt` already advertises that sitemap; no per-article robots change is needed.

## Release checks

Open the changed pages in a browser and confirm the article’s local images load, home → blog → article navigation works, and the selected hero/latest cards point to the same intended URL. Verify the final canonical, OG/Twitter, JSON-LD, and sitemap URLs exactly match the published article path. There is no documented automated test or build step.
