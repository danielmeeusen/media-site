import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      paper: '#0B0B0B',
      default: '#000000',
    },
  },
  typography: {
    fontSize: 12,
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightMedium: 400,
    fontWeightBold: 600,
  },
});

export const midTheme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: '#212121',
    },
  },
  typography: {
    fontSize: 12,
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightMedium: 400,
    fontWeightBold: 600,
  },
});

export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
  },
  typography: {
    fontSize: 12,
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightMedium: 400,
    fontWeightBold: 600,
  },
});