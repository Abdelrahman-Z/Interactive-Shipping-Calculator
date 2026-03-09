# Playwright Test Contracts

## UI Selectors (Contracts between Tests and React Components)

Playwright tests will rely on specific selectors to navigate the application. Where possible, we rely on core accessible roles (e.g. `getByRole('button', { name: 'Next' })`).

For elements that require explicit `data-testid` attributes to ensure test stability across layout shifts or content changes:

| Component       | Expected `data-testid` | Purpose                                      |
|-----------------|------------------------|----------------------------------------------|
| `SidebarSummary`| `sidebar-total-price`  | To verify the calculated total price summary |
| `ResultsGrid`   | `courier-card-*`       | To count and verify available courier cards  |
| `EmptyState`    | `empty-state-container`| To verify the empty state is rendered        |
| `ErrorState`    | `error-state-container`| To verify the error state is rendered        |
| `LoadingState`  | `loading-skeleton`     | To verify loading state appears              |

## Mock API Contracts (Deterministic Triggers)

The tests will utilize the existing `src/features/quote/services/quoteService.ts` to trigger specific scenarios.

| Input Zip Code | Expected Behavior                                         | Test Story         |
|----------------|---------------------------------------------------------|--------------------|
| `00000`        | Returns `[]` (Empty Array)                               | User Story 2       |
| `99999`        | Throws Error (`Server error: Database connection failed.`)| User Story 3       |
| *Any other*    | Returns mock courier options array                       | User Story 1       |
