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
