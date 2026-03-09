import { Container, Box, Typography, Button, Paper } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuote } from '../context/QuoteContext';
import { QuoteStepper } from './QuoteStepper';
import { SidebarSummary } from './SidebarSummary';
import { ResultsGrid } from './ResultsGrid';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import { EmptyState } from './EmptyState';
import { quoteSchema } from '../schemas/quoteSchema';
import type { QuoteFormData } from '../schemas/quoteSchema';
import { quoteService } from '../services/quoteService';


export const QuoteScreen: React.FC = () => {
  const { state: quoteState, setLoading, setSuccess, setEmpty, setError, reset } = useQuote();
  
  const methods = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      origin: { country: 'US', city: '', postalCode: '' },
      destination: { country: 'CA', city: '', postalCode: '' },
      package: { weight: 1, length: 1, width: 1, height: 1 },
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: QuoteFormData) => {
    setLoading();
    try {
      const results = await quoteService.fetchQuotes(data);
      if (results.length === 0) {
        setEmpty();
      } else {
        setSuccess(results);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  };

  const handleNewQuote = () => {
    reset();
    methods.reset();
  };

  const handleBackToEdit = () => {
    reset();
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      py: 4,
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      width: '100vw',
    }}>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 700, color: 'primary.main', mb: 3 }}>
            Quick Quote Shipping
          </Typography>
          
          <FormProvider {...methods}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
              <Box sx={{ flex: { xs: '1 1 auto', md: '2 1 0' } }}>
                {quoteState.status === 'idle' && (
                  <QuoteStepper onSubmit={onSubmit} />
                )}
                {quoteState.status === 'loading' && (
                  <LoadingState />
                )}
                {quoteState.status === 'success' && (
                  <>
                    <ResultsGrid options={quoteState.options} />
                    <Box sx={{ mt: 4, textAlign: 'center' }}>
                      <Button 
                        onClick={handleNewQuote} 
                        variant="outlined"
                        sx={{ borderRadius: 2 }}
                      >
                        Send Another Shipment
                      </Button>
                    </Box>
                  </>
                )}
                {quoteState.status === 'empty' && (
                  <EmptyState onBack={handleBackToEdit} />
                )}
                {quoteState.status === 'error' && (
                  <ErrorState 
                    message={quoteState.error || ""} 
                    onRetry={methods.handleSubmit(onSubmit)} 
                    onBack={handleBackToEdit}
                  />
                )}
              </Box>
              <Box sx={{ flex: { xs: '1 1 auto', md: '1 1 0' }, minWidth: { md: 300 } }}>
                <SidebarSummary />
              </Box>
            </Box>
          </FormProvider>
        </Paper>
      </Container>
    </Box>
  );
};