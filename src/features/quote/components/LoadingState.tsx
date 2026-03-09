import React from 'react';
import { Box, Skeleton, Typography, Paper } from '@mui/material';

export const LoadingState: React.FC = () => {
  return (
    <Box data-testid="loading-skeleton">
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Getting best courier rates...
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {[1, 2, 3].map((i) => (
          <Paper key={i} variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ width: '60%' }}>
                <Skeleton variant="text" width="40%" height={32} />
                <Skeleton variant="text" width="60%" height={24} />
              </Box>
              <Box sx={{ width: '20%', textAlign: 'right' }}>
                <Skeleton variant="text" width="100%" height={40} />
                <Skeleton variant="text" width="60%" sx={{ ml: 'auto' }} />
              </Box>
            </Box>
            <Skeleton variant="rectangular" width="100%" height={1} sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Skeleton variant="text" width="30%" />
              <Skeleton variant="rectangular" width={80} height={30} sx={{ borderRadius: 2 }} />
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};
