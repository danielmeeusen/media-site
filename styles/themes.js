import { createTheme } from '@material-ui/core/styles';

// Create a theme instance.
export const darkTheme = createTheme({
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
    }
  }
}
  },
  palette: {
    type: 'dark',
    background: {
      paper: '#0A0A0A',
      default: '#000000',
    },
    secondary: {
      light: '#212121',
      main: '#424242',
      dark: '#616161',
      contrastText: '#ffffff',
    },
    primary: {
      light: '#9600ad',
      main: '#a100ba',
      dark: '#dd00ff',
      contrastText: '#ffffff',
    },  
  },
  shadows: ["none"],
  typography: {
    fontSize: 12,
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightMedium: 400,
    fontWeightBold: 600,
  },
});

export const lightTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      light: '#af68ba',
      main: '#a100ba',
      dark: '#750087',
      contrastText: '#ffffff',
    },
  },
  shadows: ["none"],
  typography: {
    fontSize: 12,
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightMedium: 400,
    fontWeightBold: 600,
  },
});
