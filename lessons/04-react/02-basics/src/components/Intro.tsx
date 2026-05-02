/*
  This is a simple React component.

  What looks like HTML is actually JSX syntax.

  JSX is "syntactic sugar" for React.createElement() calls.

  The JSX below is compiled into something like this:

  return React.createElement(
    "div",
    { className: "max-w-[800px] mx-auto my-10 space-y-4" },

    React.createElement(
      "h1",
      { className: "text-4xl font-bold text-center my-8" },
      "React Basics – Complete Guide",
    ),

    React.createElement(
      "p",
      null,
      "React is a JavaScript library for building user interfaces, especially single-page applications. It lets you create reusable components that manage their own state and render dynamically when data changes.",
    ),

    ...

  Tools like Babel convert JSX into these function calls before the code runs in the browser.

  JSX is optional, but it is used in almost all modern React applications because it is easier to read and write.

  React isn't magic — just predictable JavaScript.
*/

export const Intro = () => {
  console.log('Intro Component Rendered');

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="my-8 text-center text-4xl font-bold">React Basics - Complete Guide</h1>
      <p className="text-lg leading-relaxed text-gray-700">
        React is a JavaScript library for building user interfaces, especially single-page applications. It lets you create reusable
        components that manage their own state and render dynamically when data changes.
      </p>
      <p className="text-lg leading-relaxed text-gray-700">
        React applications are built by combining small, reusable components into larger interfaces.
      </p>
      <p className="text-lg leading-relaxed text-gray-700">
        React uses Virtual DOM to efficiently update only the parts of the DOM that need to change, making apps fast and responsive. In
        other words re-rendering the Virtual DOM is faster than the actual DOM.
      </p>
      <p className="text-lg leading-relaxed font-medium text-gray-700">When you change the real DOM, the browser may need to:</p>
      <ul className="list-inside list-disc space-y-1 leading-relaxed text-gray-700">
        <li>Recalculate layout (reflow)</li>
        <li>Recalculate styles</li>
        <li>Repaint pixels</li>
        <li>Update the render tree</li>
      </ul>
      <p className="text-lg leading-relaxed font-medium text-gray-700">The Virtual DOM is just plain JavaScript objects:</p>
      <ul className="list-inside list-disc space-y-1 leading-relaxed text-gray-700">
        <li>The virtual DOM is made of simple JavaScript objects</li>
        <li>It is created and compared in pure JavaScript</li>
        <li>It is not connected to layout</li>
        <li>It does not trigger reflow or repaint directly</li>
      </ul>
      <p className="text-lg leading-relaxed text-gray-700">
        React Hooks are special functions that let you use state, lifecycle methods, and other React features in functional components
        without writing classes. The most commonly used hooks are:
        <ul className="list-inside list-disc space-y-1 leading-relaxed text-gray-700">
          <li>
            <code>useState</code>
          </li>
          <li>
            <code>useEffect</code>
          </li>
          <li>
            <code>useRef</code>
          </li>
          <li>
            <code>useMemo</code>
          </li>
          <li>
            <code>useCallback</code>
          </li>
          <li>
            <code>useContext</code>
          </li>
        </ul>
      </p>

      {(() => {
        // This is an example of an Immediately Invoked Function Expression (IIFE)
        const name = 'Mr. Qayum';
        const year = new Date().getFullYear();

        return <h2 className="mt-10 text-center text-sm text-gray-500">{`Created by ${name} in ${year} 🛠️`}</h2>;
      })()}
    </div>
  );
};
