# 🟪 Pagination

## 🚀 Features

- Fetching “Now Playing” movies from TMDB API
- Pagination support for browsing multiple pages of results
- Dynamic API requests based on page state
- Click-to-view movie details using a modal
- Reusable `ImageGrid` component for movie display
- Reusable `Pagination` component for navigation
- Reusable `Modal` component for movie details
- Type-safe API responses using TypeScript
- Clean separation of UI, state and API logic

## 🧠 Key Concepts

### API Pagination

The TMDB API supports pagination using a `page` query parameter:

- `page` state controls the current page
- API request updates whenever `page` changes
- `total_pages` is stored using `useRef` to avoid unnecessary re-renders

### State Management (`useState`)

State is used to manage:

- Movie list (`movies`)
- Selected movie (`selectedMovie`)
- Modal visibility (`isModalOpen`)
- Current page (`page`)

### useRef for Persistent Data

`useRef` is used for:

- Storing `maxPages` from API response
- Preventing re-renders when page limits change

### Side Effects (`useEffect`)

`useEffect` is triggered whenever `page` changes:

- Fetches new movie data for the selected page
- Updates grid dynamically based on pagination

### Component Architecture

The app is structured into reusable components:

- `ImageGrid` → displays movie posters
- `Pagination` → handles page navigation
- `Modal` → shows detailed movie information

This improves scalability and separation of concerns.

### Event Flow

1. User clicks pagination button
2. `setPage` updates state
3. `useEffect` triggers new API request
4. Grid updates with new results

For movie selection:

1. User clicks movie card
2. `fetchMovieDetails` runs
3. Modal opens with full movie data

### Modal System

The modal provides:

- Backdrop overlay
- Click outside to close
- Close button interaction
- Dynamic content injection via selected movie state

### TypeScript Types

Strong typing ensures safe API handling:

- `NowPlayingResponse` → paginated movie list
- `GridData` → normalized grid format
- `MovieDetails` → full movie information

### Conditional Rendering

Used for:

- Loading state before movies are fetched
- Modal visibility
- Safe rendering of selected movie details

## 🔧 Tech Stack

- Vite
- React
- TypeScript
- Node.js
- Tailwind CSS
- Axios
- ESLint
- Prettier
