import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { QuoteProvider } from './features/quote/context/QuoteContext';
import { QuoteScreen } from './features/quote/components/QouteScreen';


const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
  },
});



function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QuoteProvider>
        <QuoteScreen />
      </QuoteProvider>
    </ThemeProvider>
  );
}

export default App;
