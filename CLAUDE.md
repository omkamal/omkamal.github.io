# CLAUDE.md - AI Assistant Guide for omkamal.github.io

## Project Overview

This is **Omar Kamal Hosney's personal GitHub Pages site** hosted at `https://omkamal.github.io`. It serves as a portfolio and collection of technical cheatsheets focused on data science, machine learning, and AI tools.

**Key facts:**
- Static HTML site with no build process
- Direct deployment to GitHub Pages (commits push to production)
- 30 HTML files including cheatsheets, resume, and index page
- Author: Omar Kamal Hosney (26+ years experience in data science/ML)

## Directory Structure

```
/
├── index.html              # Main landing page with navigation to all cheatsheets
├── resume.html             # Professional resume/CV page
├── omar.jpeg               # Author profile photo
├── aider_config.py         # Aider AI tool configuration
├── list_directory.sh       # Utility script for directory listing
├── .gitignore              # Excludes .aider* and .env files
├── README.md               # Brief project description
├── CLAUDE.md               # This file
├── aider/                  # Aider-related resources subdirectory
│   └── aider_tips.html
└── [28 cheatsheet HTML files]  # Topic-specific reference guides
```

## File Naming Conventions

| Type | Convention | Examples |
|------|------------|----------|
| Cheatsheets | `snake_case.html` | `postgres_sql.html`, `numpy_cheatsheet.html` |
| Presentations | `kebab-case.html` | `aider-presentation.html`, `curser-presentation.html` |
| Special pages | lowercase single word | `index.html`, `resume.html`, `docker.html` |

## HTML Template Structure

All cheatsheets follow a consistent pattern:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Topic] Cheat Sheet</title>
    <style>
        /* Embedded CSS - see CSS Conventions below */
    </style>
</head>
<body>
    <div class="author">Omar Hosney</div>
    <div class="linkedin"><a href="https://www.linkedin.com/in/okhosney">LinkedIn</a></div>
    <h1>[Title with Emojis] 📊</h1>
    <div class="container">
        <div class="section">
            <h2>[Section Title]</h2>
            <!-- Content: lists, code blocks, tables -->
        </div>
        <!-- More sections -->
    </div>
</body>
</html>
```

## CSS Conventions

### Standard Classes
- `.container` - 3-column CSS Grid layout (`grid-template-columns: repeat(3, 1fr)`)
- `.container-1col` - Single column layout for wide content
- `.section` - White card with rounded corners and shadow
- `.section-span-2` / `.section-span-3` - Multi-column spanning sections
- `.author` - Fixed position author name (top-left)
- `.linkedin` - Fixed position LinkedIn link (top-right)

### Typography
- Font: 'Roboto' from Google Fonts (fallback: sans-serif)
- Base font-size: 10px (optimized for print/PDF)
- Headers: h1 (24px), h2 (14px with colored border-bottom)

### Color Palette
- Background: `#f0f8ff` (light blue) or `#f0f3f5`
- Text: `#333` or `#34495e`
- Primary accent: `#3498db` (blue)
- Secondary accent: `#2ecc71` (green) or `#e74c3c` (red)
- Section cards: `#fff` white with shadow

### Print Optimization
- Pages optimized for 297mm width (A4 paper)
- Media queries for print styling included

## Code Block Styling

```css
code {
    background-color: #f4f4f4;  /* Light gray background */
    padding: 2px 4px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
}

pre {
    background-color: #2d2d2d;  /* Dark background for blocks */
    color: #f8f8f2;
    padding: 10px;
    border-radius: 5px;
    overflow-x: auto;
}
```

## Development Workflow

### No Build Process
- Edit HTML files directly
- No webpack, Jekyll, or other build tools
- Changes are immediately reflected on GitHub Pages after push

### Git Workflow
1. Edit HTML files
2. Commit with semantic message (see Commit Conventions)
3. Push to main branch
4. GitHub Pages automatically deploys

### Aider Configuration
The project uses Aider with auto-commits disabled:
```python
# aider_config.py
AIDER_AUTO_COMMITS = False
```

## Commit Message Conventions

Follow semantic commit format:
- `feat:` - New features or cheatsheets
- `fix:` - Bug fixes or corrections
- `docs:` - Documentation updates
- `chore:` - Maintenance tasks
- `refactor:` - Code restructuring

Examples:
```
feat: add PostgreSQL cheatsheet with join diagrams
fix: update LinkedIn profile URL to direct link
docs: add SQL order of execution diagram
```

## Content Guidelines

### Cheatsheet Structure
1. **Title** - Clear topic name with relevant emoji
2. **Sections** - Logical groupings (Installation, Basics, Advanced, etc.)
3. **Code examples** - Practical, copy-pasteable snippets
4. **Brief descriptions** - Concise explanations

### Emojis Usage
- Use relevant emojis in h1 titles (e.g., 🐘 for PostgreSQL, 🐍 for Python)
- Keep emojis consistent with topic
- Don't overuse - 1-2 per title is sufficient

### Author Attribution
Every cheatsheet includes:
- Author name in `.author` div (top-left)
- LinkedIn link in `.linkedin` div (top-right)
- LinkedIn URL: `https://www.linkedin.com/in/okhosney`

## Common Tasks for AI Assistants

### Adding a New Cheatsheet
1. Create new HTML file with `snake_case.html` naming
2. Copy structure from existing cheatsheet (e.g., `docker.html`)
3. Update title, sections, and content
4. Add entry to `index.html` in appropriate category

### Updating index.html
The index page organizes cheatsheets into categories:
- Machine Learning Cheatsheets
- Large Language Models
- Generative AI Agents
- DevOps
- Databases
- Aider Cheatsheet

Add new entries following this pattern:
```html
<li>
    <a href="filename.html">Cheatsheet Title</a>
    <p>Brief description of the cheatsheet content.</p>
</li>
```

### Fixing Common Issues
- **Broken links**: Check href attributes match actual filenames
- **Styling inconsistencies**: Use existing CSS classes from other cheatsheets
- **Mobile responsiveness**: Ensure media queries are present

## External Integrations

- **Google Fonts**: Poppins, Roboto via `@import`
- **Font Awesome**: Icons via CDN (`cdnjs.cloudflare.com`)
- **LinkedIn**: Author profile link
- **Medium**: Blog link (`medium.com/@omkamal`)
- **Payhip**: Embedded product sales widget
- **Amazon**: Affiliate book links

## Files to Avoid Modifying

- `omar.jpeg` - Profile photo (binary file)
- `.gitignore` - Standard exclusions
- `aider_config.py` - Aider tool configuration

## Testing

No automated tests. Manual verification:
1. Open HTML file directly in browser
2. Check responsive layout at different widths
3. Verify all links work
4. Test print preview for cheatsheets

## Existing Cheatsheet Topics

**Machine Learning**: scikit-learn, NumPy, PyTorch, XGBoost, CatBoost, PyCaret, PCA, dimensionality reduction, statistical tests, ML algorithms

**LLMs & AI**: HuggingFace, PEFT, Fabric, LangChain, OpenAI Agents SDK, Generative AI Agents

**DevOps & Databases**: Docker, PostgreSQL, SQLite

**Tools**: Aider, GitHub Copilot
