import { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export function AppWrapper({ children }) {
  const [ menuOpen, setMenuOpen ] = useState(true);

  const sharedState = [
    menuOpen,
    setMenuOpen,
  ]

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}