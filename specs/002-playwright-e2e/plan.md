# Implementation Plan: Playwright E2E Tests

**Branch**: `002-playwright-e2e` | **Date**: 2026-03-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-playwright-e2e/spec.md`

## Summary

Add Playwright end-to-end testing to the existing React + TypeScript shipping calculator. The implementation will focus on configuring Playwright for the Vite environment and creating tests for the happy path, empty state, and error state across desktop and mobile viewports, relying primarily on accessible selectors without altering existing architecture.

## Technical Context

**Language/Version**: TypeScript / Node.js 
**Primary Dependencies**: Playwright (`@playwright/test`)
**Testing**: Playwright test runner
**Target Platform**: Web Browsers (Chromium, Firefox, WebKit) via Playwright
**Project Type**: React Web Application (Vite-based)
**Constraints**: Keep application functionally identical; minimal UI additions (`data-testid`) only where accessible selectors fail; keep mock API deterministic.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Strict TS**: Playwright tests will be written in strict TypeScript.
- [x] **Mobile-First**: Playwright config will include mobile device emulation (e.g., Mobile Safari/Chrome) for responsive smoke testing.
- [x] **Forms**: Tests will interact with the existing React Hook Form implementation via accessible DOM queries.
- [x] **State**: Tests will inherently validate the Context-driven state transitions by observing the UI.
- [x] **Performance**: (N/A for test infrastructure, but UI changes for testability will not impact app performance).
- [x] **Async UI**: Tests are explicitly designed to validate the idle, loading, success, empty, and error UI states.
- [x] **Modularity**: (N/A for test infrastructure).
- [x] **Docs**: README will be updated with Playwright installation and execution commands.

## Project Structure

### Documentation (this feature)

```text
specs/002-playwright-e2e/
├── plan.md              # This file
├── research.md          # Output: Playwright configuration best practices for Vite
└── tasks.md             # Tasks for implementation
```

### Source Code (repository root)

```text
/
├── playwright.config.ts # Playwright configuration file
├── tests/
│   ├── e2e/             # Playwright test files
│   │   ├── quote-flow.spec.ts  # Happy path tests
│   │   └── edge-cases.spec.ts  # Empty and error state tests
├── src/
│   ├── (Existing app code with minor data-testid additions)
```

**Structure Decision**: A standard Playwright setup in the repository root (`tests/e2e` and `playwright.config.ts`), separate from the React source code (`src/`), ensuring clean separation of test orchestration and application logic.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| *None*    | *N/A*      | *N/A*     |
