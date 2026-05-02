# 🟪 Context

## 🚀 Features

- Global user state management via React Context
- Persistent in-app user profile name (`userName`)
- Global favorites system using `Map` for fast lookup
- Toggle-based favorite/unfavorite logic
- Shared state across all routes and components
- Header-level access to user and favorites count
- Favorites page powered entirely by global context
- Settings page with controlled profile updates
- Optimized re-rendering through centralized state updates
- Reusable custom hook (`useUserContext`) for safe context access

## 🧠 Key Concepts

### Global State with React Context

The app introduces a global state layer using `React.createContext`, allowing shared data across all routes without prop drilling.

The context stores:

- `userName`
- `setUserName`
- `favorites` (Map of selected items)
- `toggleFavorite` (add/remove logic)

This makes user-related state accessible anywhere in the app.

### Context Provider Architecture

The `UserProvider` wraps the application and acts as the single source of truth for user state.

It manages:

- Local state (`useState`)
- Derived global behavior (`toggleFavorite`)
- Immutable updates via `new Map()`

This ensures predictable state updates and avoids mutation bugs.

### Efficient Favorites Management with Map

Favorites are stored in a `Map<number, ImageCell>` instead of an array.

Benefits:

- O(1) lookup for `has(image.id)`
- Fast toggle operations (`set` / `delete`)
- No duplicate entries
- Easy conversion to array for rendering (`Array.from(map.values())`)

This is especially useful for grid-heavy UIs.

### Toggle Pattern for Favorites

The `toggleFavorite` function provides a clean binary interaction model:

- If item exists → remove it
- If item doesn’t exist → add it

This pattern simplifies UI logic across all views.

### Custom Hook for Safe Context Access

A dedicated hook (`useUserContext`) wraps `useContext` and enforces safety:

- Prevents undefined context usage
- Throws explicit error if provider is missing
- Centralizes access pattern across the app

This avoids silent runtime failures.

### Header as Global UI Consumer

The `Header` component demonstrates shared-state consumption:

- Displays `userName`
- Shows live favorites count badge
- Provides navigation shortcuts to:
  - Favorites page
  - Settings page

This turns global state into real-time UI feedback.

### Cross-View Favorites Synchronization

Favorites are now consistent across:

- Now Playing view
- Trending view
- Movie modal view
- Favorites view

Any toggle instantly updates all dependent UI without manual syncing.

### Derived UI State in FavoritesView

The favorites page demonstrates computed rendering:

- `Array.from(favorites.values())` converts Map → renderable list
- Empty state handled cleanly (`favorites.size === 0`)
- Reuses `ImageGrid` for consistent UI

This shows how global state can be transformed per-view without duplication.

### Controlled Profile State (Settings System)

The Settings view introduces controlled user editing:

- Local draft state (`value`)
- Validation (`trimmed !== ''`)
- Error state handling
- Reset vs Save actions

This separates:

- Temporary UI state (input buffer)
- Persistent global state (`userName`)

### Local vs Global State Separation

The architecture clearly distinguishes:

**Global state (Context):**

- userName
- favorites

**Local state (Component-level):**

- pagination
- modal state
- form inputs
- search filters

This prevents over-centralization and keeps UI responsive.

### Event-Driven Global Updates

User interactions now propagate globally:

- Clicking heart → updates all views
- Renaming user → updates header instantly
- Removing favorites → syncs everywhere

This is classic reactive architecture powered by context.

### Component Integration Pattern

Context integrates seamlessly into existing architecture:

- `ImageGrid` → consumes favorites toggle
- `Modal` → uses same state system
- `Header` → reflects global state
- `Views` → remain stateless regarding user data

This preserves component reusability.

### Safe Context Boundary Enforcement

The custom hook enforces a strict rule:

> Context must only be used inside `UserProvider`

This prevents accidental misuse and improves maintainability in large apps.

## 🔧 Tech Stack

- Vite
- React
- React Router
- React Icons
- TypeScript
- Node.js
- Tailwind CSS
- Axios
- ESLint
- Prettier
