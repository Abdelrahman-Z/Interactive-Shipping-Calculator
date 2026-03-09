import { Typography, Button, Paper, Box } from '@mui/material';
import { ErrorOutline as ErrorIcon, Refresh as RefreshIcon, Edit as EditIcon } from '@mui/icons-material';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
  onBack: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry, onBack }) => {
  return (
    <Paper 
      variant="outlined" 
      data-testid="error-state-container"
      sx={{ 
        p: 6, 
        textAlign: 'center', 
        borderRadius: 4, 
        bgcolor: 'error.main', 
        color: 'error.contrastText',
        border: 'none',
        boxShadow: 4
      }}
    >
      <ErrorIcon sx={{ fontSize: 80, mb: 2, opacity: 0.9 }} />
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Oops! Something went wrong
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
        {message || "We couldn't fetch the shipping rates. Please check your connection and try again."}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          color="inherit" 
          startIcon={<RefreshIcon />}
          onClick={onRetry}
          sx={{ 
            color: 'error.main', 
            bgcolor: 'white',
            fontWeight: 'bold',
            px: 3,
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.9)',
            }
          }}
        >
          Retry Quote
        </Button>
        <Button 
          variant="outlined" 
          color="inherit" 
          startIcon={<EditIcon />}
          onClick={onBack}
          sx={{ 
            borderColor: 'white',
            color: 'white',
            fontWeight: 'bold',
            px: 3,
            '&:hover': {
              borderColor: 'white',
              bgcolor: 'rgba(255, 255, 255, 0.1)',
            }
          }}
        >
          Edit Details
        </Button>
      </Box>
    </Paper>
  );
};
