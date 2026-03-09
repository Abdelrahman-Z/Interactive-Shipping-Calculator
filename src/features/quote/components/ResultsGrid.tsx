import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { CourierCard } from './CourierCard';
import type { CourierOption } from '../types';

interface ResultsGridProps {
  options: CourierOption[];
}

export const ResultsGrid: React.FC<ResultsGridProps> = ({ options }) => {
  const cheapestId = useMemo(() => {
    if (options.length === 0) return null;
    return options.reduce((prev, curr) => prev.price < curr.price ? prev : curr).id;
  }, [options]);

  const fastestId = useMemo(() => {
    if (options.length === 0) return null;
    return options.reduce((prev, curr) => prev.estimatedDays < curr.estimatedDays ? prev : curr).id;
  }, [options]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Available Shipping Options
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr', lg: '1fr' }, gap: 3 }}>
        {options.map((option) => (
          <CourierCard
            key={option.id}
            option={option}
            isCheapest={option.id === cheapestId}
            isFastest={option.id === fastestId}
          />
        ))}
      </Box>
    </Box>
  );
};
