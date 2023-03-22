import { createTheme } from '@material-ui/core/styles';

export const darkTheme = createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*::-webkit-text-size-adjust': 'none',        
        '*::-webkit-scrollbar': {
          width: '10px'
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'rgba(255, 255, 255, .15)',
          borderRadius: '10px',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(255, 255, 255, .15)',
          borderRadius: '10px',
        },
      }
    },
    MuiOutlinedInput: {
      input: {
        '&:-webkit-autofill': {
          '-webkit-box-shadow': '0 0 0 100px #000 inset',
          '-webkit-text-fill-color': '#fff'
        }
      }
    },
  },
  shape: {
    borderRadius: 15
  },
  shadows: Array(36).fill("none"),
  palette: {
    type: 'dark',
    background: {
      paper: '#0d0d0d',
      default: '#000000',
    },
    boxShadow: {
      searchAutofill:  "0 0 0 1000px #151515 inset",
      searchAutofillHover: "0 0 0 1000px #1E1E1E inset",
      searchBackground: '#191919',
      searchBackgroundHover:'#1f1f1f',
    },
    custom: {
      ninety: 'rgba(255, 255, 255, .90)',
      eightyFive: 'rgba(255, 255, 255, .85)',
      eighty: 'rgba(255, 255, 255, .80)',
      seventyFive: 'rgba(255, 255, 255, .75)',
      seventy: 'rgba(255, 255, 255, .70)',
      sixtyFive: 'rgba(255, 255, 255, .65)',
      sixty: 'rgba(255, 255, 255, .60)',
      fiftyFive: 'rgba(255, 255, 255, .55)',
      fifty: 'rgba(255, 255, 255, .50)',
      fortyFive: 'rgba(255, 255, 255, .45)',
      forty: 'rgba(255, 255, 255, .40)',
      thirtyFive: 'rgba(255, 255, 255, .35)',
      thirty: 'rgba(255, 255, 255, .30)',
      twentyFive: 'rgba(255, 255, 255, .25)',
      twenty: 'rgba(255, 255, 255, .20)',
      fifteen: 'rgba(255, 255, 255, .15)',
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      hint: 'rgba(255, 255, 255, 0.5)',
      icon: 'rgba(255, 255, 255, 0.5)',
    },
    primary: {
      light: '#9000a6',
      main: '#a200ba',
      dark: '#bd00d9',
      contrastText: '#ffffff',
    },  
    secondary: {
      light: '#191919',
      main: '#262626',
      dark: '#4d4d4d',
      contrastText: '#ffffff',
    },
    
  },
  typography: {
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightMedium: 400,
    fontWeightBold: 600,
  }
});

export const dimTheme = createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*::-webkit-scrollbar': {
          width: '10px'
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'rgba(255, 255, 255, .15)',
          borderRadius: '10px',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(255, 255, 255, .15)',
          borderRadius: '10px',
        },
      }
    },
    MuiOutlinedInput: {
      input: {
        '&:-webkit-autofill': {
          '-webkit-box-shadow': '0 0 0 100px #000 inset',
          '-webkit-text-fill-color': '#fff'
        }
      }
    },
  },
  shadows: Array(36).fill("none"),
  palette: {
    type: 'dark',
    background: {
      paper: '#333333',
      default: '#262626',
    },
    boxShadow: {
      searchAutofill:  "0 0 0 1000px #151515 inset",
      searchAutofillHover: "0 0 0 1000px #1E1E1E inset",
      searchBackground: '#191919',
      searchBackgroundHover:'#1f1f1f',
    },
    custom: {
      ninety: 'rgba(255, 255, 255, .90)',
      eightyFive: 'rgba(255, 255, 255, .85)',
      eighty: 'rgba(255, 255, 255, .80)',
      seventyFive: 'rgba(255, 255, 255, .75)',
      seventy: 'rgba(255, 255, 255, .70)',
      sixtyFive: 'rgba(255, 255, 255, .65)',
      sixty: 'rgba(255, 255, 255, .60)',
      fiftyFive: 'rgba(255, 255, 255, .55)',
      fifty: 'rgba(255, 255, 255, .50)',
      fortyFive: 'rgba(255, 255, 255, .45)',
      forty: 'rgba(255, 255, 255, .40)',
      thirtyFive: 'rgba(255, 255, 255, .35)',
      thirty: 'rgba(255, 255, 255, .30)',
      twentyFive: 'rgba(255, 255, 255, .25)',
      twenty: 'rgba(255, 255, 255, .20)',
      fifteen: 'rgba(255, 255, 255, .15)',
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      hint: 'rgba(255, 255, 255, 0.5)',
      icon: 'rgba(255, 255, 255, 0.5)',
    },
    primary: {
      light: '#9000a6',
      main: '#a200ba',
      dark: '#bd00d9',
      contrastText: '#ffffff',
    },  
    secondary: {
      light: '#191919',
      main: '#404040',
      dark: '#4d4d4d',
      contrastText: '#ffffff',
    },
    
  },
  typography: {
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightMedium: 400,
    fontWeightBold: 600,
  }
});

export const lightTheme = createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*::-webkit-scrollbar': {
          width: '10px'
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'rgba(0, 0, 0, .15)',
          borderRadius: '10px',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0, 0, 0, .15)',
          borderRadius: '10px',
        }
      }
    },
    MuiOutlinedInput: {
      input: {
           '&:-webkit-autofill': {
             '-webkit-box-shadow': '0 0 0 100px #fff inset',
             '-webkit-text-fill-color': '#000'
           }
         }
    },
  },
  shadows: Array(36).fill("none"),
  palette: {
    type: "light",
    background: {
      paper: '#f2f2f2',
      default: '#ffffff',
    },
    boxShadow: {
      searchAutofill:  "0 0 0 1000px #eaeaea inset",
      searchAutofillHover: "0 0 0 1000px #e1e1e1 inset",
      searchBackground: '#e6e6e6',
      searchBackgroundHover:'#e0e0e0', 
    },
    custom: {
      ninety: 'rgba(0, 0, 0, 1)',
      eightyFive: 'rgba(0, 0, 0, 1)',
      eighty: 'rgba(0, 0, 0, 1)',
      seventyFive: 'rgba(0, 0, 0, 1)',
      seventy: 'rgba(0, 0, 0, 1)',
      sixtyFive: 'rgba(0, 0, 0, .95)',
      sixty: 'rgba(0, 0, 0, .90)',
      fiftyFive: 'rgba(0, 0, 0, .85)',
      fifty: 'rgba(0, 0, 0, .80)',
      fortyFive: 'rgba(0, 0, 0, .75)',
      forty: 'rgba(0, 0, 0, .70)',
      thirtyFive: 'rgba(0, 0, 0, .65)',
      thirty: 'rgba(0, 0, 0, .60)',
      twentyFive: 'rgba(0, 0, 0, .55)',
      twenty: 'rgba(0, 0, 0, .50)',
      fifteen: 'rgba(0, 0, 0, .45)',
    },
    text: {
      primary: "rgb(0, 0, 0)",
      secondary: "rgba(0, 0, 0, 0.90)",
      disabled: "rgba(0, 0, 0, 0.85)",
      hint: "rgba(0, 0, 0, 0.85)",
      divider: "rgba(0, 0, 0, 0.85)"
    },
    primary: {
      light: '#9600ad',
      main: '#a100ba',
      dark: '#dd00ff',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#e6e6e6',
      main: '#cccccc',
      dark: '#b3b3b3',
      contrastText: '#000000',
    },
  },
  shadows: ["none"],
  typography: {
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightMedium: 400,
    fontWeightBold: 600,
  }
});
