# Quickstart: Quick Quote

This guide explains how to spin up and view the Quick Quote React application.

## Prerequisites
- Node.js (v18+)
- npm or yarn

## Installation

1. Navigate to the repository root.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure you have the Material UI, React Hook Form, and Zod dependencies:
   ```bash
   npm install @mui/material @emotion/react @emotion/styled @mui/icons-material react-hook-form zod @hookform/resolvers
   ```

## Running the App
1. Start the Vite development server:
   ```bash
   npm run dev
   ```
2. Open your browser to `http://localhost:5173`.
3. You will see the Quick Quote shipping calculator.
4. Fill out the 3 steps, observe the live summary sidebar updating instantly, and watch the async quote retrieval handle loading and success states.

## Testing
- Ensure standard Vitest or React Testing Library suites pass (if configured).
- To manually test error and empty states, there may be specific zip codes hardcoded in `quoteService.ts` to trigger them for demonstration purposes.
