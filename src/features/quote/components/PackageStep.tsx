import React from 'react';
import { TextField, Box, Typography, InputAdornment } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import type { QuoteFormData } from '../schemas/quoteSchema';

export const PackageStep: React.FC = () => {
  const { control, formState: { errors } } = useFormContext<QuoteFormData>();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Package Dimensions
        </Typography>
      </Box>
      
      <Box sx={{ maxWidth: { sm: '50%' } }}>
        <Controller
          name="package.weight"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Weight"
              type="number"
              fullWidth
              onChange={(e) => field.onChange(parseFloat(e.target.value))}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
              error={!!errors.package?.weight}
              helperText={errors.package?.weight?.message}
            />
          )}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Controller
            name="package.length"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Length"
                type="number"
                fullWidth
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                InputProps={{
                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                }}
                error={!!errors.package?.length}
                helperText={errors.package?.length?.message}
              />
            )}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Controller
            name="package.width"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Width"
                type="number"
                fullWidth
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                InputProps={{
                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                }}
                error={!!errors.package?.width}
                helperText={errors.package?.width?.message}
              />
            )}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Controller
            name="package.height"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Height"
                type="number"
                fullWidth
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                InputProps={{
                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                }}
                error={!!errors.package?.height}
                helperText={errors.package?.height?.message}
              />
            )}
          />
        </Box>
      </Box>
    </Box>
  );
};
