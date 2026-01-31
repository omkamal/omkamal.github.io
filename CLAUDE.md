# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a GitHub Pages site (omkamal.github.io) hosting data science, machine learning, and AI cheatsheets as static HTML files. No build system is required - files are served directly by GitHub Pages.

## Development

**Local preview**: Open any HTML file directly in a browser, or use a local server:
```bash
python -m http.server 8000
```

**Deployment**: Push to `main` branch - GitHub Pages automatically serves the content.

## Architecture

- **index.html**: Main landing page with navigation to all cheatsheets, author bio, and book promotions
- **Individual cheatsheets**: Self-contained HTML files with inline CSS (no shared stylesheets except `style.css` for print)
- **style.css**: Print-specific styles for A4 page formatting
- **omar.jpeg**: Author profile image used in index.html

### Cheatsheet Structure Pattern

Each cheatsheet HTML file follows a consistent pattern:
- Inline `<style>` block with complete CSS
- 3-column grid layout using `.container` class
- Sections with `.section` class, supporting `.section-span-2` and `.section-span-3` for wider content
- Code blocks using `<pre><code>` with syntax highlighting via inline styles
- Author attribution and LinkedIn link in fixed position headers

### Content Categories

- **Machine Learning**: scikit-learn, NumPy, PyTorch, XGBoost, CatBoost, PyCaret, PCA, dimensionality reduction
- **LLMs**: Hugging Face, PEFT, Fabric, LangChain
- **AI Agents**: OpenAI Agents SDK
- **Databases**: SQLite, PostgreSQL
- **DevOps**: Docker
- **Tools**: Aider (AI coding assistant)
