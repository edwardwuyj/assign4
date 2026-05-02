# 🟪 Storage

## 🚀 Features

- Persistent global state using React Context + Local Storage
- User profile name saved across sessions (`userName`)
- Favorites system persisted in browser storage
- Custom `useLocalStorage` hook for reusable persistence logic
- Map-based favorites system for fast lookup and toggling
- Automatic sync between state and `localStorage`
- Shared state across all routes and components
- Header, views and modal all stay in sync across refreshes
- Clean separation between UI state and persistence layer

## 🧠 Key Concepts

### Persistent State with Local Storage Hook

The `useLocalStorage` hook abstracts browser persistence:

- Reads initial value from `localStorage`
- Falls back to default value if missing or invalid
- Automatically serializes state updates back to storage

This makes state persistent without manual storage logic in components.

### Custom Hook Pattern: useLocalStorage

The hook combines:

- `useState` for reactive UI updates
- `useEffect` for persistence side effects
- JSON serialization for safe storage

Key behavior:

- Lazy initialization reads from storage once
- Every update syncs automatically to `localStorage`

This allows any state to become persistent with one line of code.

### Context Layer with Persistent State

The `UserProvider` now uses `useLocalStorage` instead of `useState`, making global state persistent across sessions.

It manages:

- `userName` → stored under `USERNAME_KEY`
- `favoritesStorage` → stored as serialized entries array
- `toggleFavorite` → updates both Map + storage

This turns Context into a persistence-aware state container.

### Favorites Stored as Serializable Entries

Since `Map` cannot be directly stored in `localStorage`, the system uses:

- `Array<[number, ImageCell]>` for storage
- `new Map(favoritesStorage)` for runtime usage

Flow:

- Storage → Array of entries
- Runtime → Map for fast access
- Update → Map → Array → storage

This bridges performance + persistence.

### Toggle Logic with Persistence Sync

The `toggleFavorite` function:

- Clones current Map
- Adds or removes item
- Converts Map → Array
- Saves back to localStorage via hook

This ensures:

- UI updates immediately
- State persists after refresh
- No duplicate entries

### Map-Based Runtime Performance Layer

Even though storage uses arrays, runtime uses `Map` for:

- O(1) lookup (`has(image.id)`)
- Fast toggle operations
- Efficient rendering checks in UI

This keeps performance high while still being persistent.

### Hybrid State Architecture (Map + Array)

The system uses a dual-layer approach:

**Storage layer:**

- JSON-safe array format

**Runtime layer:**

- Map for efficient operations

This balances:

- Browser limitations (JSON storage)
- Performance requirements (Map access)

### Global State Synchronization Across App

Because state lives in Context:

- Header updates instantly with favorites count
- Movie views reflect saved state
- Favorites page rebuilds from Map
- Settings updates persist after refresh

Everything stays in sync without extra logic.

### Component Transparency

Components remain unaware of persistence:

- They consume Context normally
- They do not interact with localStorage directly
- Persistence is fully abstracted away

This keeps UI layer clean and reusable.

### Safe Persistence Initialization

The hook safely handles:

- Missing keys in localStorage
- Invalid JSON (try/catch fallback)
- Type-safe return (`T` generic)

This prevents runtime crashes from corrupted storage.

### Separation of Concerns

Architecture is now split into:

**Persistence layer:**

- `useLocalStorage`

**State layer:**

- `UserProvider`

**UI layer:**

- Views, Header, Components

This makes the system scalable and maintainable.

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
