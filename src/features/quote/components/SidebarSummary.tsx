import React from 'react';
import { Card, CardContent, Typography, Box, Divider, Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import type { QuoteFormData } from '../schemas/quoteSchema';

export const SidebarSummary: React.FC = () => {
  const { watch } = useFormContext<QuoteFormData>();
  const values = watch();

  const hasOrigin = values.origin?.city || values.origin?.postalCode;
  const hasDestination = values.destination?.city || values.destination?.postalCode;
  const hasDimensions = values.package?.weight || values.package?.length;

  return (
    <Card sx={{ height: 'fit-content', position: 'sticky', top: 24 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Shipment Summary
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" color="primary">
              Origin
            </Typography>
            {hasOrigin ? (
              <Typography variant="body2">
                {values.origin.city && `${values.origin.city}, `}
                {values.origin.country} {values.origin.postalCode}
              </Typography>
            ) : (
              <Typography variant="body2" color="text.disabled">
                Not entered
              </Typography>
            )}
          </Box>

          <Box>
            <Typography variant="subtitle2" color="primary">
              Destination
            </Typography>
            {hasDestination ? (
              <Typography variant="body2">
                {values.destination.city && `${values.destination.city}, `}
                {values.destination.country} {values.destination.postalCode}
              </Typography>
            ) : (
              <Typography variant="body2" color="text.disabled">
                Not entered
              </Typography>
            )}
          </Box>

          <Box>
            <Typography variant="subtitle2" color="primary">
              Package
            </Typography>
            {hasDimensions ? (
              <Typography variant="body2">
                {values.package.weight}kg | {values.package.length}x{values.package.width}x{values.package.height}cm
              </Typography>
            ) : (
              <Typography variant="body2" color="text.disabled">
                Not entered
              </Typography>
            )}
          </Box>
          <Box data-testid="sidebar-total-price">
            <Typography variant="subtitle2" color="primary">
              Estimated Total
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Calculated at next step
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
