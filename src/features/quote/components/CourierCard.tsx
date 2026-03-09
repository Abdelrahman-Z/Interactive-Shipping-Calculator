import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Button, Divider } from '@mui/material';
import { 
  LocalShipping as ShippingIcon, 
  Speed as FastIcon, 
  Savings as CheapIcon 
} from '@mui/icons-material';
import type { CourierOption } from '../types';

interface CourierCardProps {
  option: CourierOption;
  isCheapest?: boolean;
  isFastest?: boolean;
}

export const CourierCard: React.FC<CourierCardProps> = ({ option, isCheapest, isFastest }) => {
  return (
    <Card 
      variant="outlined" 
      data-testid={`courier-card-${option.id}`}
      sx={{ 
        position: 'relative',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
          borderColor: 'primary.main',
        },
        borderRadius: 2,
        overflow: 'visible'
      }}
    >
      <Box sx={{ position: 'absolute', top: -12, left: 16, display: 'flex', gap: 1 }}>
        {isCheapest && (
          <Chip
            icon={<CheapIcon sx={{ fontSize: '1rem !important' }} />}
            label="Cheapest"
            color="success"
            size="small"
            sx={{ fontWeight: 'bold' }}
          />
        )}
        {isFastest && (
          <Chip
            icon={<FastIcon sx={{ fontSize: '1rem !important' }} />}
            label="Fastest"
            color="info"
            size="small"
            sx={{ fontWeight: 'bold' }}
          />
        )}
      </Box>

      <CardContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
              <ShippingIcon /> {option.providerName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {option.serviceLevel}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {option.currency} {option.price.toFixed(2)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Est. {option.estimatedDays} {option.estimatedDays === 1 ? 'day' : 'days'}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
            Includes fuel surcharge & taxes
          </Typography>
          <Button variant="contained" size="small" disableElevation sx={{ borderRadius: 2 }}>
            Select
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
