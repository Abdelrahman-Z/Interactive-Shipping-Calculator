# Tasks: Quick Quote Calculator

**Input**: Design documents from `/specs/001-quick-quote/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/quote-api.ts

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create feature directory structure in `src/features/quote` including subdirectories `components`, `context`, `schemas`, `services`, and `types`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Create domain types and API contracts in `src/features/quote/types/index.ts`.
- [x] T003 Create Zod validation schema in `src/features/quote/schemas/quoteSchema.ts`.
- [x] T004 Implement `QuoteContext` state provider in `src/features/quote/context/QuoteContext.tsx`.
- [x] T005 [P] Implement mock async `quoteService` with artificial delay in `src/features/quote/services/quoteService.ts`.
- [x] T006 Set up base layout and context provider wrapper in `src/App.tsx`.

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - 3-Step Shipment Details (Priority: P1) 🎯 MVP

**Goal**: Merchants need to enter the shipment origin, destination, and package dimensions in a clear, guided 3-step flow while seeing a live summary of their inputs.

**Independent Test**: Can be fully tested by entering data into the 3-step wizard and verifying the live summary updates correctly across devices, without making actual API calls.

### Implementation for User Story 1

- [x] T007 [P] [US1] Create `SidebarSummary` component mapping to form values in `src/features/quote/components/SidebarSummary.tsx`.
- [x] T008 [P] [US1] Create `OriginStep` form component in `src/features/quote/components/OriginStep.tsx`.
- [x] T009 [P] [US1] Create `DestinationStep` form component in `src/features/quote/components/DestinationStep.tsx`.
- [x] T010 [P] [US1] Create `PackageStep` form component in `src/features/quote/components/PackageStep.tsx`.
- [x] T011 [US1] Create `QuoteStepper` component integrating the three steps in `src/features/quote/components/QuoteStepper.tsx`.
- [x] T012 [US1] Integrate `QuoteStepper` and `SidebarSummary` side-by-side using MUI Grid in `src/App.tsx`.

**Checkpoint**: At this point, User Story 1 should be fully functional with live form validation and summary tracking.

---

## Phase 4: User Story 2 - Compare Courier Options (Priority: P2)

**Goal**: After completing the 3-step flow, merchants need to compare available courier options, seeing pricing breakdowns, estimated delivery timelines, and clear badges for the "Cheapest" and "Fastest" options.

**Independent Test**: Can be tested by providing mock shipment data to the service and verifying that the results screen accurately sorts, filters, and highlights the cheapest and fastest couriers.

### Implementation for User Story 2

- [x] T013 [P] [US2] Create skeleton `LoadingState` component using MUI Skeletons in `src/features/quote/components/LoadingState.tsx`.
- [x] T014 [P] [US2] Create `CourierCard` component with explicit badges in `src/features/quote/components/CourierCard.tsx`.
- [x] T015 [US2] Create `ResultsGrid` component utilizing `CourierCard` and styling in `src/features/quote/components/ResultsGrid.tsx`.
- [x] T016 [US2] Intercept form submission to call `QuoteService` and conditionally display `LoadingState` or `ResultsGrid` in `src/App.tsx`.

**Checkpoint**: At this point, valid inputs should retrieve and render the mock API results correctly.

---

## Phase 5: User Story 3 - Error and Empty State Handling (Priority: P3)

**Goal**: Gracefully handle invalid states, unserviceable routes, or system failures with explicit empty and error UI components.

**Independent Test**: Can be tested by forcing an error in the service or querying an unserviceable zip code to verify the proper fallback UI is rendered.

### Implementation for User Story 3

- [x] T017 [P] [US3] Create `EmptyState` component with clear copy in `src/features/quote/components/EmptyState.tsx`.
- [x] T018 [P] [US3] Create `ErrorState` component with a retry button in `src/features/quote/components/ErrorState.tsx`.
- [x] T019 [US3] Integrate error boundaries or catch blocks in `src/App.tsx` routing to display `ErrorState` or `EmptyState` based on API response.

**Checkpoint**: All user stories should now be fully functional. Error states gracefully recover or halt the user appropriately.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T020 Run formatting and code cleanup (`npm run lint`).
- [x] T021 Manual responsive visual check on mobile widths (< 600px).
- [x] T022 Update `README.md` and `PROMPTS.md` with Quick Quote architectural details (already complete, just verify).

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - Sequential priority order (P1 → P2 → P3)

### Parallel Opportunities

- The foundational mock service (T005) can be built in parallel with foundational types/schemas (T002-T004).
- The individual form step components (Origin, Destination, Package) and Sidebar Summary (T007-T010) have no dependencies on each other and can be built entirely in parallel.
- Card/Skeleton components (T013-T014) and Empty/Error state components (T017-T018) can be built in parallel.

## Implementation Strategy

### Incremental Delivery
1. Complete Setup + Foundational → Foundation ready.
2. Complete User Story 1 (3-step entry + live summary) → Deploy/Demo (MVP).
3. Complete User Story 2 (Service retrieval + Results UI) → Deploy/Demo.
4. Complete User Story 3 (Empty/Error states) → Final Polish.
