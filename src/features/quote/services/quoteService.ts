import type { CourierOption, QuoteRequest } from '../types';

export const quoteService = {
  async fetchQuotes(request: QuoteRequest): Promise<CourierOption[]> {
    console.log('Fetching quotes for:', request);
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Demo triggers based on zip code
    if (request.origin.postalCode === '99999') {
      throw new Error('Server error: Database connection failed.');
    }
    
    if (request.origin.postalCode === '00000') {
      return [];
    }

    // Default mock data
    return [
      {
        id: '1',
        providerName: 'FedEx',
        serviceLevel: 'Priority Overnight',
        price: 45.99,
        currency: 'USD',
        estimatedDays: 1,
      },
      {
        id: '2',
        providerName: 'UPS',
        serviceLevel: 'Ground',
        price: 12.50,
        currency: 'USD',
        estimatedDays: 5,
      },
      {
        id: '3',
        providerName: 'DHL',
        serviceLevel: 'Express',
        price: 38.00,
        currency: 'USD',
        estimatedDays: 2,
      },
      {
        id: '4',
        providerName: 'USPS',
        serviceLevel: 'Flat Rate',
        price: 8.95,
        currency: 'USD',
        estimatedDays: 7,
      },
    ];
  },
};
