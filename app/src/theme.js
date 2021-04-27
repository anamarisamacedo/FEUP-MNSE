import { createMuiTheme } from '@material-ui/core/styles';
import '@fontsource/inter';
import '@fontsource/galada';

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
    fontFamily: ['Inter', 'Galada'].join(','),
  },
  h3: {
    fontFamily: 'Galada',
  },
});

export default theme;
