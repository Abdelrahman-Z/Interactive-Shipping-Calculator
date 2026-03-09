import { z } from 'zod';

export const addressSchema = z.object({
  country: z.string().length(2, 'Country code must be 2 characters'),
  region: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
});

export const measurementsSchema = z.object({
  weight: z.number().positive('Weight must be greater than 0'),
  length: z.number().positive('Length must be greater than 0'),
  width: z.number().positive('Width must be greater than 0'),
  height: z.number().positive('Height must be greater than 0'),
});

export const quoteSchema = z.object({
  origin: addressSchema,
  destination: addressSchema,
  package: measurementsSchema,
});

export type QuoteFormData = z.infer<typeof quoteSchema>;
