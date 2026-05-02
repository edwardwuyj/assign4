# 🟪 Tooling

## 🚀 Features

- Configuring VS Code default settings and recommended extensions
- Formatting code with Prettier
- Custom scripts
- Custom alias
- Running tools

## 🧠 Key Concepts

### VS Code Configuration

To ensure a consistent coding environment across teams and devices, VS Code provides configuration settings via JSON files.

To configure VS Code, follow these steps:

1. Create a folder called `.vscode` in the **main folder** (`my-project`) of the Vite project.

2. Create a file called `extensions.json` in the `.vscode` folder and paste the following JSON object:

```json
{
  "recommendations": [
    "vscode-icons-team.vscode-icons",
    "formulahendry.auto-rename-tag",
    "dsznajder.es7-react-js-snippets",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "dbaeumer.vscode-eslint",
    "ritwickdey.liveserver",
    "tomoki1207.pdf",
    "streetsidesoftware.code-spell-checker"
  ]
}
```

3. Create a file called `settings.json` in the `.vscode` folder and paste the following JSON object:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "js/ts.tsdk.path": "node_modules/typescript/lib",
  "files.eol": "\n",
  "files.watcherExclude": {
    "**/node_modules": true
  }
}
```

The `extensions.json` file will recommended installing the above extensions the next time VS Code starts.

The `settings.json` file sets VS Code's default behavior for the project.

### Prettier Formatter

Prettier is an opinionated code formatter that can format many file extensions.

Install the following node dependencies through the terminal:

```bash
npm install -D prettier prettier-plugin-organize-imports prettier-plugin-tailwindcss
```

To configure Prettier's default settings, create a `prettier.config.js` file in the **main folder** (`my-project`) of the Vite project and paste following:

```javascript
export default {
  printWidth: 140,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  endOfLine: 'lf',
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
};
```

The first plugin organizes import statements; it is also helpful to create `index.ts` files inside all root folders.

The second plugin organizes tailwind classes.

### Custom Scripts

To ensure a healthy codebases, the industry standard is to subject all code through the following:

1. Formatting - ensuring consistent spaces, indents, commas, single/double quotes, ... etc

2. Linting - identify any unsafe actions, unused variables, missing imports, ... etc

3. Type Checking - ensuring that data types match their specified use cases (especially for JavaScript)

To automate this process, scripts are used to run formatting, linting and type checking tools.

Vite has basic scripts like `dev`, `build`, `lint` and `preview` that can be found in the `package.json` file.

Install the following scripting tools via the terminal:

```bash
npm install -D npm-run-all chokidar-cli
```

Replace the existing `script` object in `package.json` with the following:

```json
"scripts": {
  "dev": "npm run lint && npm-run-all --parallel --print-label vite type-check lint:watch",
  "vite": "vite --clearScreen false",
  "type-check": "tsc -b --noEmit --watch --preserveWatchOutput",
  "lint": "prettier --plugin=prettier-plugin-tailwindcss --check . && eslint . --cache",
  "lint:watch": "chokidar \"src/**/*.{ts,tsx}\" --ignoreInitial -c \"prettier --plugin=prettier-plugin-tailwindcss --check \\\"{path}\\\" && eslint \\\"{path}\\\" --color\"",
  "format": "prettier --write .",
  "build": "tsc -b && vite build",
  "preview": "vite preview"
},
```

### Custom Alias

Instead of using `./` or `../` for imports, an alias like (`@`) can be used.

To configure an alias, modify the `vite.config.ts` and `tsconfig.app.json` as follows:

1. Paste the following in `vite.config.js` below the plugins field and add the `path` import to the top:

```javascript
import path from 'path';

resolve: {
  alias: {
    '@': path.resolve(__dirname, 'src'), // Set "@" to refer to the root folder
  },
},
```

2. Paste the following in `tsconfig.app.json` below the `Linting` section:

```javascript
/* Alias */
"paths": {
  "@/*": ["./src/*"]
}
```

### Running Tools

1. Restart VS Code and reopen the Vite project folder (`my-project`) to ensure the above configurations initialize correctly.

2. Run the the following command:

```bash
npm run dev
```

3. If there are formatting warnings, run the following two commands **separately**:

```bash
npm run format
npm run dev
```

4. If there are no errors or warnings, something similar should display:

```bash
[lint:watch]
[lint:watch] > tooling@0.0.0 lint:watch
[lint:watch] > chokidar "src/**/*.{ts,tsx}" --ignoreInitial -c "prettier --plugin=prettier-plugin-tailwindcss --check \"{path}\" && eslint \"{path}\" --color"
[lint:watch]
[lint:watch] Watching "src/**/*.{ts,tsx}" ..
[type-check]
[type-check] 10:53:39 PM - Starting compilation in watch mode...
[type-check]
[vite      ] 10:53:39 PM [vite] (client) Re-optimizing dependencies because lockfile has changed
[vite      ]
[vite      ]   VITE v8.0.10  ready in 397 ms
[vite      ]
[vite      ]   ➜  Local:   http://localhost:5173/
[vite      ]   ➜  Network: use --host to expose
[vite      ]   ➜  press h + enter to show help
[type-check]
[type-check] 10:53:40 PM - Found 0 errors. Watching for file changes.
```

## 🔧 Tech Stack

- Vite
- React
- TypeScript
- Node.js
- ESLint
- Prettier
