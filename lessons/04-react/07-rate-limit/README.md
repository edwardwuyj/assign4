# 🟪 Rate Limit

## 🚀 Features

- Live movie search using external API
- Toggle between debounce and throttle search modes
- Paginated search results
- Clickable movie grid with modal details view
- Reusable UI components for search, grid, pagination and buttons
- Dynamic data fetching based on user input and state changes
- Conditional rendering for modal and loading states
- Centralized state management in a single app component

## 🧠 Key Concepts

### Controlled Inputs with React State

The search input is fully controlled using React state. The value is stored in `useState` and updated on every keystroke, making React the single source of truth for the input field.

### Debouncing and Throttling

The app demonstrates two rate-limiting strategies:

- **Debounce** delays API requests until the user stops typing
- **Throttle** limits API requests to a fixed interval

This is handled through custom hooks `useDebounce` and `useThrottle`, showing how performance optimizations can be abstracted into reusable logic.

### Custom Hooks for Data Fetching

The `useTmdb` hook is used to encapsulate API logic. It handles fetching, query parameters and dependency tracking, making the component cleaner and more declarative.

### Dynamic Query Composition

The API query changes dynamically based on:

- Search input
- Selected mode (debounce or throttle)
- Current page

This demonstrates reactive data flow based on multiple state sources.

### Component Communication via Props

Child components like `SearchBar`, `ButtonGroup`, `ImageGrid` and `Pagination` receive data and callbacks through props, reinforcing unidirectional data flow.

### Conditional Rendering

The UI conditionally renders:

- Loading state when data is missing
- Modal only when a movie is selected
- Grid only when results are available

This ensures safe rendering based on application state.

### State-Driven UI Modes

The app switches between debounce and throttle modes using a simple string state. This demonstrates how UI behavior can be dynamically controlled without changing component structure.

### Event Handling in React

User interactions such as typing, clicking buttons and selecting movies trigger state updates and API requests, showing event-driven architecture in React.

### Component Reusability

The app uses highly reusable components:

- `SearchBar` for input handling
- `ButtonGroup` for mode selection
- `ImageGrid` for displaying results
- `Pagination` for navigation

This improves scalability and separation of concerns.

### Type Safety with TypeScript

Props and API responses are strongly typed, ensuring predictable data flow and reducing runtime errors.

## 🔧 Tech Stack

- Vite
- React
- TypeScript
- Node.js
- Tailwind CSS
- Axios
- ESLint
- Prettier
