import { createContext, useState } from 'react';

// Create Context
export const AppContext = createContext();

// Provider Component
export const AppProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};