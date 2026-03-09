import React from 'react';
import { TextField, Box, Typography, MenuItem } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import type { QuoteFormData } from '../schemas/quoteSchema';

export const DestinationStep: React.FC = () => {
  const { control, formState: { errors } } = useFormContext<QuoteFormData>();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Destination Details
        </Typography>
      </Box>

      <Box>
        <Controller
          name="destination.country"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Country"
              fullWidth
              error={!!errors.destination?.country}
              helperText={errors.destination?.country?.message}
            >
              <MenuItem value="US">United States</MenuItem>
              <MenuItem value="GB">United Kingdom</MenuItem>
              <MenuItem value="CA">Canada</MenuItem>
              <MenuItem value="DE">Germany</MenuItem>
            </TextField>
          )}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        <Box sx={{ flex: 1 }}>
          <Controller
            name="destination.city"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="City"
                fullWidth
                error={!!errors.destination?.city}
                helperText={errors.destination?.city?.message}
              />
            )}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Controller
            name="destination.postalCode"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Postal Code"
                fullWidth
                error={!!errors.destination?.postalCode}
                helperText={errors.destination?.postalCode?.message}
              />
            )}
          />
        </Box>
      </Box>
    </Box>
  );
};
