import React from 'react';
import { Typography, Button, Paper } from '@mui/material';
import { Inbox as EmptyIcon, Edit as EditIcon } from '@mui/icons-material';

interface EmptyStateProps {
  onBack: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onBack }) => {
  return (
    <Paper 
      variant="outlined" 
      data-testid="empty-state-container"
      sx={{ 
        p: 6, 
        textAlign: 'center', 
        borderRadius: 4, 
        bgcolor: 'background.paper',
        border: '2px dashed',
        borderColor: 'divider'
      }}
    >
      <EmptyIcon sx={{ fontSize: 80, mb: 2, color: 'text.disabled' }} />
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        No Options Found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        We couldn't find any shipping couriers for the provided routes and dimensions. Try adjusting your shipment details.
      </Typography>
      <Button 
        variant="outlined" 
        startIcon={<EditIcon />}
        onClick={onBack}
        sx={{ borderRadius: 2, px: 4 }}
      >
        Adjust Shipment Details
      </Button>
    </Paper>
  );
};
