# Feature Specification: Quick Quote Calculator

**Feature Branch**: `001-quick-quote`  
**Created**: 2026-03-07  
**Status**: Draft  
**Input**: User description: "Build a Quick Quote shipping calculator for merchants..."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 3-Step Shipment Details Entry (Priority: P1)

Merchants need to enter the shipment origin, destination, and package dimensions in a clear, guided 3-step flow while seeing a live summary of their inputs.

**Why this priority**: Gathering accurate shipment data is the prerequisite for calculating any quotes. The live summary builds trust and reduces data entry errors.

**Independent Test**: Can be fully tested by entering data into the 3-step wizard and verifying the live summary updates correctly across devices, without making actual API calls.

**Acceptance Scenarios**:

1. **Given** the calculator is in the initial state, **When** the merchant completes step 1 (origin) and proceeds, **Then** the live summary updates to show the origin and step 2 (destination) is presented.
2. **Given** the merchant is on step 3 (dimensions), **When** they update the package weight, **Then** the live summary immediately reflects the new weight.

---

### User Story 2 - Compare Courier Options (Priority: P2)

After completing the 3-step flow, merchants need to compare available courier options, seeing pricing breakdowns, estimated delivery timelines, and clear badges for the "Cheapest" and "Fastest" options.

**Why this priority**: The core value proposition of the tool is enabling merchants to make informed, cost-effective shipping decisions quickly.

**Independent Test**: Can be tested by providing mock shipment data and verifying that the results screen accurately sorts, filters, and highlights the cheapest and fastest couriers.

**Acceptance Scenarios**:

1. **Given** valid shipment details are submitted, **When** the app retrieves courier rates, **Then** the loading state is shown until results appear.
2. **Given** multiple courier options are returned, **When** the results are displayed, **Then** the lowest price option is highlighted as "Cheapest" and the shortest timeline option is highlighted as "Fastest".

---

### User Story 3 - Error and Empty State Handling (Priority: P3)

If the shipping route is invalid or no couriers service the requested dimensions, the merchant needs to see a clear empty or error state explaining the issue so they can adjust their inputs.

**Why this priority**: Gracefully handling failures is critical for maintaining a polished experience and preventing user frustration.

**Independent Test**: Can be tested by submitting known invalid routes or oversized packages and verifying the correct error/empty UI is displayed.

**Acceptance Scenarios**:

1. **Given** a valid route but no available couriers, **When** the search completes, **Then** the "empty" state UI is displayed instructing the merchant to try a different package size.
2. **Given** an API failure or network issue, **When** fetching rates, **Then** the explicit "error" state UI is shown with a retry option.

### Edge Cases

- What happens when a package dimension exceeds maximum limits for all couriers?
- How does system handle international addresses with missing postal codes?
- How does the live summary behave on very small mobile screens?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a guided 3-step wizard for data entry (1. Origin, 2. Destination, 3. Dimensions).
- **FR-002**: System MUST display a live summary of entered data that persists alongside or above the active step.
- **FR-003**: System MUST validate inputs at each step before allowing the user to proceed.
- **FR-004**: System MUST sort and display courier options comparing total price and estimated delivery timeline.
- **FR-005**: System MUST explicitly highlight the single "Cheapest" and single "Fastest" courier options.
- **FR-006**: System MUST present distinct UI states for: initial (data entry), loading (fetching rates), complete/success (options found), empty (no options found), and error (system failure).
- **FR-007**: System MUST support international shipping origins and destinations [NEEDS CLARIFICATION: Are there specific restricted countries or supported regions we must limit the origin/destination to?]

### Design Constraints (From Constitution)

- **UI/UX**: Must be mobile-first responsive (Material UI).
- **State/Data**: Forms must use React Hook Form + Zod. Async states must explicitly define UI for idle, loading, success, empty, and error scenarios.
- **Performance**: High-frequency updates (e.g. typing) must minimize unnecessary rerenders.

### Key Entities *(include if feature involves data)*

- **Shipment Details**: Contains Origin (Address), Destination (Address), and Package (Weight, Length, Width, Height).
- **Courier Option**: Contains Provider Name, Service Level, Total Price, Estimated Delivery Days, and Badges (Cheapest, Fastest).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 95% of merchants can complete the 3-step data entry flow in under 60 seconds.
- **SC-002**: The Results screen renders within 200ms of receiving rate data.
- **SC-003**: The live summary updates instantly (<50ms) as the user types without locking the UI.
- **SC-004**: The calculator is fully usable on mobile screens down to 320px width without horizontal scrolling.

## Assumptions

- We assume fiat currency is USD by default for pricing breakdowns.
- We assume standard metric/imperial toggle is not strictly required for MVP, relying on the user's local defaults unless specified.
# Interactive Shipping Calculator

This project is a single-page React application that provides a **Quick Quote Shipping Calculator** for merchants. It is built using React, TypeScript, Vite, Material UI, React Hook Form, and Zod.

## Process Overview

The application features a guided 3-step wizard for data entry to calculate shipping quotes:
1. **Origin**: Enter the shipment origin address.
2. **Destination**: Enter the shipment destination address.
3. **Dimensions**: Enter the package dimensions (weight, length, width, height).

A live summary of the entered data persists alongside the active step, updating instantly as the user types. After completing the flow, the application fetches and displays courier options, allowing merchants to compare pricing breakdowns and estimated delivery timelines.

## Functional Requirements

- **Guided Wizard**: The system provides a 3-step wizard for data entry (Origin, Destination, Dimensions).
- **Live Summary**: A persistent live summary of entered data is displayed alongside the active step.
- **Input Validation**: Inputs are validated at each step before allowing the user to proceed.
- **Courier Comparison**: The system sorts and displays courier options comparing total price and estimated delivery timeline.
- **Highlighting Options**: The system explicitly highlights the single "Cheapest" and single "Fastest" courier options.
- **UI States**: Distinct UI states are presented for: initial (data entry), loading (fetching rates), complete/success (options found), empty (no options found), and error (system failure).
- **International Shipping**: Support for international shipping origins and destinations.

## Non-Functional Requirements & Design Constraints

- **UI/UX**: The application is mobile-first and responsive, built with Material UI. The calculator is fully usable on mobile screens down to 320px width.
- **State Management & Form Validation**: Forms utilize React Hook Form + Zod for strict validation. Every user-facing async state enforces explicit UI components for idle, loading, success, empty, and error states.
- **Performance**: High-frequency updates minimize unnecessary rerenders. The Results screen renders rapidly (<200ms) upon receiving rate data, and live summary updates instantly (<50ms).
- **Bundle Optimization**: The project imports only necessary sub-modules from Material UI, uses precise type imports, and relies on small, reusable components to prevent bundle bloat. Network load is optimized with skeleton loading states rather than blocking the UI.
- **Error Handling**: The mock API explicitly returns readable errors for unserviceable routes instead of generic HTTP failures.

## Testing

The project uses [Playwright](https://playwright.dev/) for end-to-end testing. The test suite covers the multi-step quote flow, including success, empty, and error states across desktop and mobile viewports.

To run the E2E tests:

```bash
# Install browsers (first time only)
npx playwright install

# Run all tests
npm run test:e2e

# Run tests in UI mode
npm run test:e2e:ui
```

## Running the Development Server

To start the local Vite development server:

```bash
npm install
npm run dev
```
