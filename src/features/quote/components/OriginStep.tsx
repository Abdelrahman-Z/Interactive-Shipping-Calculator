import React from 'react';
import { TextField, Box, Typography, MenuItem } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import type { QuoteFormData } from '../schemas/quoteSchema';

export const OriginStep: React.FC = () => {
  const { control, formState: { errors } } = useFormContext<QuoteFormData>();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Origin Details
        </Typography>
      </Box>
      
      <Box>
        <Controller
          name="origin.country"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Country"
              fullWidth
              error={!!errors.origin?.country}
              helperText={errors.origin?.country?.message}
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
            name="origin.city"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="City"
                fullWidth
                error={!!errors.origin?.city}
                helperText={errors.origin?.city?.message}
              />
            )}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Controller
            name="origin.postalCode"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Postal Code"
                fullWidth
                error={!!errors.origin?.postalCode}
                helperText={errors.origin?.postalCode?.message}
              />
            )}
          />
        </Box>
      </Box>
    </Box>
  );
};
