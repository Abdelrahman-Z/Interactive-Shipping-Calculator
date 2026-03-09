# Data Model: Quick Quote

## Entities

### `Address`
Represents a shipping origin or destination.
- `country` (string, required) - 2-letter ISO code
- `region` (string, optional) - State/Province
- `city` (string, required)
- `postalCode` (string, required)

### `Measurements`
Represents the physical package.
- `weight` (number, required) - in kg
- `length` (number, required) - in cm
- `width` (number, required) - in cm
- `height` (number, required) - in cm

### `QuoteRequest`
The aggregate state maintained by the 3-step wizard and `QuoteContext`.
- `origin` (Address)
- `destination` (Address)
- `package` (Measurements)

### `CourierOption`
The result returned by the pricing API.
- `id` (string) - Unique identifier for the rate
- `providerName` (string) - e.g., "FedEx", "UPS"
- `serviceLevel` (string) - e.g., "Priority Overnight", "Ground"
- `price` (number) - Total cost
- `currency` (string) - e.g., "USD"
- `estimatedDays` (number) - Estimated transit time in days

### `QuoteState` (UI State)
- `status` ('idle' | 'loading' | 'success' | 'empty' | 'error')
- `options` (CourierOption[])
- `error` (string | null)

## Validation Rules (Zod)
- All dimensions must be > 0.
- Postal codes must not be empty.
- Country codes must be exactly 2 characters.
