# Tasks: Playwright E2E Tests

**Input**: Design documents from `/specs/002-playwright-e2e/`
**Prerequisites**: plan.md, spec.md, research.md, contracts/ui-selectors.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic Playwright Test structure.

- [x] T001 Initialize Playwright dependencies in `package.json`.
- [x] T002 Create and configure `playwright.config.ts` with Vite `webServer` setting and both desktop & mobile browser projects in the repository root.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core UI selector additions that MUST be complete before ANY test user story can be written reliably.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T003 [P] Add `data-testid="sidebar-total-price"` to `SidebarSummary` component in `src/features/quote/components/SidebarSummary.tsx`.
- [x] T004 [P] Add `data-testid="courier-card-*"` tags to `CourierCard` component in `src/features/quote/components/CourierCard.tsx`.
- [x] T005 [P] Add `data-testid="empty-state-container"` to `EmptyState` component in `src/features/quote/components/EmptyState.tsx`.
- [x] T006 [P] Add `data-testid="error-state-container"` to `ErrorState` component in `src/features/quote/components/ErrorState.tsx`.
- [x] T007 [P] Add `data-testid="loading-skeleton"` to `LoadingState` component in `src/features/quote/components/LoadingState.tsx`.

**Checkpoint**: Application is now testable with stable selectors.

---

## Phase 3: User Story 1 - Validate Successful Quote Flow (Priority: P1) 🎯 MVP

**Goal**: Ensure the core shipping calculator works from start to finish.

**Independent Test**: Can be verified by running `npx playwright test tests/e2e/quote-flow.spec.ts`.

### Implementation for User Story 1

- [x] T008 [US1] Create Happy Path test file in `tests/e2e/quote-flow.spec.ts`.
- [x] T009 [US1] Write test filling out origin, destination, and package details using standard zip codes.
- [x] T010 [US1] Assert live sidebar summary updates correctly during the workflow in `tests/e2e/quote-flow.spec.ts`.
- [x] T011 [US1] Assert loading state appears and results grid renders after submission in `tests/e2e/quote-flow.spec.ts`.

**Checkpoint**: At this point, the happy path quote flow is fully tested end-to-end.

---

## Phase 4: User Story 2 - Validate Empty Result State (Priority: P2)

**Goal**: Handle unserviceable route zip code inputs.

**Independent Test**: Can be verified by running `npx playwright test tests/e2e/edge-cases.spec.ts -g "Empty State"`.

### Implementation for User Story 2

- [x] T012 [P] [US2] Create edge cases test file in `tests/e2e/edge-cases.spec.ts`.
- [x] T013 [US2] Write test using the `'00000'` zip code to verify the Empty State triggers and renders correctly in `tests/e2e/edge-cases.spec.ts`.

---

## Phase 5: User Story 3 - Validate Error State Handling (Priority: P2)

**Goal**: Handle application errors robustly.

**Independent Test**: Can be verified by running `npx playwright test tests/e2e/edge-cases.spec.ts -g "Error State"`.

### Implementation for User Story 3

- [x] T014 [US3] Write test using the `'99999'` zip code to verify the Error State triggers correctly in `tests/e2e/edge-cases.spec.ts`.
- [x] T015 [US3] Assert the user can recover from the error by clicking "Edit Details" and verifying the form preserves previous values in `tests/e2e/edge-cases.spec.ts`.

**Checkpoint**: All user flow tests are completed and executing.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect the overall test suite.

- [x] T016 Execute the full test suite (`npx playwright test`) to verify the responsive smoke test passes across all configured mobile and desktop viewports.
- [x] T017 Update `README.md` adding documentation on how to run Playwright tests (e.g. `npm run test:e2e`).

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Must be completed first to enable Playwright.
- **Foundational (Phase 2)**: Depends on Setup. Unblocks writing robust tests.
- **User Story 1 (Phase 3)**: Depends on Foundational UI selectors.
- **User Stories 2 & 3 (Phases 4-5)**: Depend on Foundational UI selectors. Can be done parallel to US1.

### Parallel Opportunities

- All UI Selector additions (T003-T007) can be done in parallel.
- User Story 2 (Empty) and User Story 3 (Error) can be implemented in parallel after Foundation is ready.

## Implementation Strategy

1. Complete Playwright setup and insert `data-testid` attributes without breaking the app.
2. Implement US1 MVP (`quote-flow.spec.ts`). Run and verify.
3. Implement US2 & US3 edge cases (`edge-cases.spec.ts`). Run and verify.
4. Execute full suite for mobile and desktop across browsers. Update README.
