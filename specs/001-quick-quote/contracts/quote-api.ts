export interface Address {
  country: string;
  region?: string;
  city: string;
  postalCode: string;
}

export interface Measurements {
  weight: number;
  length: number;
  width: number;
  height: number;
}

export interface QuoteRequest {
  origin: Address;
  destination: Address;
  package: Measurements;
}

export interface CourierOption {
  id: string;
  providerName: string;
  serviceLevel: string;
  price: number;
  currency: string;
  estimatedDays: number;
}

/**
 * Interface for the mock backend service.
 */
export interface QuoteService {
  /**
   * Fetches quote options based on the provided request.
   * This is a mocked async function that simulates network delay.
   */
  fetchQuotes(request: QuoteRequest): Promise<CourierOption[]>;
}
