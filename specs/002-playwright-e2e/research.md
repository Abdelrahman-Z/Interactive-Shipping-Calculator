# Playwright Configuration & Best Practices for Vite / React

## Decision: Playwright Test Runner paired with standard Vite configuration

### Rationale
Playwright is a modern, fast, and highly reliable end-to-end testing framework that natively supports TypeScript out of the box. The application is built with Vite, meaning we can leverage `webServer` settings in the `playwright.config.ts` to automatically start and tear down the Vite dev server (`npm run dev`) during test execution. 

### Implementation Details
- **Configuration (`playwright.config.ts`)**: We will define a standard configuration targeting Chromium, Firefox, and WebKit (Desktop + Mobile profiles). The `webServer` property will execute `npm run dev` and wait for the `http://localhost:5173` port.
- **Directory Structure**: 
  - `tests/e2e/` will contain standard `.spec.ts` files aligned directly with the stories defined in `spec.md`.
- **Selector Strategy**: Playwright's philosophy relies on accessible selectors: `getByRole`, `getByLabel`, `getByText`. We will prioritize these to avoid altering the React component tree.
- **Mocking**: Since the requirement states "keep the fake quote API deterministic", we will *not* intercept network requests. Instead, the tests will rely on the existing `/src/features/quote/services/quoteService.ts` inputs to trigger deterministic behavior (e.g., zip codes `00000` for empty, `99999` for error).

### Alternatives Considered
- **Cypress**: Rejected due to a slower execution model and heavier memory footprint. Playwright's parallel execution and multi-browser support are superior for modern React apps.
- **Vitest + Testing Library (Component Testing)**: Rejected. While excellent for unit tests, the requirement explicitly demands *end-to-end* testing of the full multi-step flow and results rendering across browsers and viewports.
