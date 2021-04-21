import { createMuiTheme } from '@material-ui/core/styles';
import '@fontsource/galada';
import '@fontsource/inter';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F4F2F3',
    },
    secondary: {
      main: '#A7C6DA',
    },
    background: {
      default: '#F49F0A',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#06070E',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
    ].join(','),
  },
});

export const logoFont = createMuiTheme({
  typography: {
    fontFamily: [
      'Galada',
      'Inter',
    ].join(','),
  },
});

export default theme;
