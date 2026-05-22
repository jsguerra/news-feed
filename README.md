# SciNews

A collection of dark-themed news aggregator pages that pull articles from RSS feeds across different topics. Each page filters and displays relevant content in a responsive card layout.

## Pages

- **PaleoNews** (`index.html`) — Paleontology & anthropology news from ScienceDaily, Nature, Science News, Live Science, and more.
- **AIFeed** (`ai.html`) — AI, generative AI, and agent news from OpenAI, Google AI, The Verge, Ars Technica, VentureBeat, and more.
- **FrontendFeed** (`frontend.html`) — Frontend development news from CSS-Tricks, Smashing Magazine, Dev.to, JavaScript Weekly, and more.

## Features

- Server-side RSS proxy to avoid CORS issues
- Keyword-based filtering for topic relevance
- Search, source filtering, and sort controls
- Skeleton loading states
- Placeholder thumbnails for articles without images
- Responsive card grid layout
- Deduplication by title similarity

## Project Structure

```
scinews/
├── server.js              # Express proxy server
├── package.json
└── src/
    ├── index.html         # PaleoNews page
    ├── ai.html            # AIFeed page
    ├── frontend.html      # FrontendFeed page
    ├── css/
    │   └── styles.css     # Shared styles
    └── js/
        ├── app.js         # Shared application logic
        ├── paleo.js       # PaleoNews feeds & keywords
        ├── ai.js          # AIFeed feeds & keywords
        └── frontend.js    # FrontendFeed feeds & keywords
```

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

- **Port** — Set the `PORT` environment variable (default: `3000`).
- **Feeds** — Edit the `FEEDS` array in the page-specific JS file (`src/js/paleo.js`, `src/js/ai.js`, or `src/js/frontend.js`).
- **Keywords** — Edit the `KEYWORDS` array in the same file to adjust topic filtering.
- **Theme** — Override CSS variables in each HTML file's inline `<style>` block.
