import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Box, Paper } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { OriginStep } from './OriginStep';
import { DestinationStep } from './DestinationStep';
import { PackageStep } from './PackageStep';
import type { QuoteFormData } from '../schemas/quoteSchema';

const steps = ['Origin', 'Destination', 'Package'];

export const QuoteStepper: React.FC<{ onSubmit: (data: QuoteFormData) => void }> = ({ onSubmit }) => {
  const [activeStep, setActiveStep] = useState(0);
  const { trigger, handleSubmit } = useFormContext<QuoteFormData>();

  const handleNext = async () => {
    let isValid = false;
    if (activeStep === 0) isValid = await trigger('origin');
    if (activeStep === 1) isValid = await trigger('destination');
    if (activeStep === 2) isValid = await trigger('package');

    if (isValid) {
      if (activeStep === steps.length - 1) {
        handleSubmit(onSubmit)();
      } else {
        setActiveStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0: return <OriginStep />;
      case 1: return <DestinationStep />;
      case 2: return <PackageStep />;
      default: return 'Unknown step';
    }
  };

  return (
    <Paper sx={{ p: 4, borderRadius: 2 }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 2, mb: 4 }}>
        {getStepContent(activeStep)}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        {activeStep !== 0 && (
          <Button onClick={handleBack} variant="outlined">
            Back
          </Button>
        )}
        <Button
          variant="contained"
          onClick={handleNext}
        >
          {activeStep === steps.length - 1 ? 'Get Quotes' : 'Next'}
        </Button>
      </Box>
    </Paper>
  );
};
