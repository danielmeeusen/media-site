import { createContext, useContext, useState } from 'react';

export const leftDeskMenuContext = createContext();
export const mobileMenuContext = createContext();
export const mobileHomeContext = createContext();
export const mobileSearchContext = createContext();
export const mobileAccountContext = createContext();


export function ContextWrapper({ children }) {
  const [ leftDeskMenu, setLeftDeskMenu ] = useState(true);
  const [ mobileMenu, setMobileMenu ] = useState({"display": "none"});
  const [ mobileHome, setMobileHome ] = useState({"display": "block"});
  const [ mobileSearch, setMobileSearch ] = useState({"display": "none"});
  const [ mobileAccount, setMobileAccount ] = useState({"display": "none"});


  return (
    <leftDeskMenuContext.Provider value={[ leftDeskMenu, setLeftDeskMenu ]}>
      <mobileMenuContext.Provider value={[ mobileMenu, setMobileMenu ]}>
        <mobileHomeContext.Provider value={[ mobileHome, setMobileHome ]}>
          <mobileSearchContext.Provider value={[ mobileSearch, setMobileSearch ]}>
            <mobileAccountContext.Provider value={[ mobileAccount, setMobileAccount ]}>
          
          {children}
          
            </mobileAccountContext.Provider>
          </mobileSearchContext.Provider>
        </mobileHomeContext.Provider>
      </mobileMenuContext.Provider>
    </leftDeskMenuContext.Provider>
  );
}
