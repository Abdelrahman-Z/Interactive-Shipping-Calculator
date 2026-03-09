import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { QuoteState, CourierOption } from '../types';

interface QuoteContextType {
  state: QuoteState;
  setLoading: () => void;
  setSuccess: (options: CourierOption[]) => void;
  setEmpty: () => void;
  setError: (error: string) => void;
  reset: () => void;
}

const initialState: QuoteState = {
  status: 'idle',
  options: [],
  error: null,
};

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<QuoteState>(initialState);

  const setLoading = () => setState({ status: 'loading', options: [], error: null });
  const setSuccess = (options: CourierOption[]) => setState({ status: 'success', options, error: null });
  const setEmpty = () => setState({ status: 'empty', options: [], error: null });
  const setError = (error: string) => setState({ status: 'error', options: [], error });
  const reset = () => setState(initialState);

  return (
    <QuoteContext.Provider value={{ state, setLoading, setSuccess, setEmpty, setError, reset }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
};
