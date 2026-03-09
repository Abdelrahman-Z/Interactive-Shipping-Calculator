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

export type QuoteStatus = 'idle' | 'loading' | 'success' | 'empty' | 'error';

export interface QuoteState {
  status: QuoteStatus;
  options: CourierOption[];
  error: string | null;
}
