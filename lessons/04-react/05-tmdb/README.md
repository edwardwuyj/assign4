# 🟪 TMDB

## 🚀 Features

- Fetching data from an external API on component mount
- Transforming API data for UI-friendly structure
- Displaying items in a responsive grid layout
- Clickable grid items triggering additional data fetch
- Modal for displaying detailed information
- Reusable `ImageGrid` and `Modal` components
- Conditional rendering based on data availability
- Optional event handling through props

## 🧠 Key Concepts

### Data Fetching with `useEffect`

The app uses `useEffect` to perform an API request when the component mounts. This reinforces how React handles side effects in functional components.

### Async/Await with Axios

API calls are handled using `async/await` with axios, showing a clean and readable approach to asynchronous logic in React.

### Data Transformation

Raw API data is mapped into a simplified structure before being stored in state. This demonstrates how to shape data for easier UI rendering.

### State Management

Multiple state variables manage:

- List data
- Selected item
- UI state like modal visibility

This highlights how React manages both data state and UI state.

### Conditional Rendering

Rendering depends on state:

- Loading message when data is not available
- Modal content only renders when an item is selected

This ensures safe and predictable UI updates.

### Component Composition

The UI is broken into reusable components like `ImageGrid` and `Modal`, showing how to structure scalable React applications.

### Props and Callback Functions

Functions are passed as props to child components, allowing interaction between components. The `onClick` prop enables child-to-parent communication.

### Optional Chaining and Safe Access

Optional chaining is used to safely access nested data, preventing runtime errors when data may be undefined.

### Dynamic List Rendering

The grid uses `.map()` to render items dynamically. Each item includes a unique key, reinforcing React’s rendering requirements.

### Event Handling in Components

Click events trigger additional API calls and update state, showing how user interaction drives application behavior.

### Type Safety with TypeScript

Custom types define the shape of API responses and component props, improving reliability and maintainability.

## 🔧 Tech Stack

- Vite
- React
- TypeScript
- Node.js
- Tailwind CSS
- Axios
- ESLint
- Prettier
