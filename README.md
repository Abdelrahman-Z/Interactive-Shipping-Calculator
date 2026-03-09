# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Project Constitution Principles

This project adheres to the [Interactive Shipping Calculator Constitution](.specify/memory/constitution.md).

### Error Handling Strategy
- Form validations strictly enforced using React Hook Form + Zod.
- Every user-facing async state MUST have explicit UI components for idle, loading, success, empty, and error states.
- **Quick Quote Note**: The mock API will explicitly return readable errors for unserviceable routes (e.g., "Origin zip code not supported") rather than generic HTTP failures.

### Bundle-Size & Performance Optimization Strategy
- Import only necessary sub-modules from Material UI.
- Use precise type imports to ensure minimal overhead.
- Components must be small, reusable, and feature-oriented to prevent bundle bloat.
- **Quick Quote Note**: To optimize for Slow 3G networks, the React components heavily rely on skeleton loading states `LoadingState.tsx` rather than blocking the UI, giving immediate feedback while fetching courier options.

## Testing

The project uses [Playwright](https://playwright.dev/) for end-to-end testing. The test suite covers the multi-step quote flow, including success, empty, and error states across desktop and mobile viewports.

### Running Tests

To run the E2E tests:

```bash
# Install browsers (first time only)
npx playwright install

# Run all tests
npm run test:e2e

# Run tests in UI mode
npm run test:e2e:ui
```

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
