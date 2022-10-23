import { createTheme } from '@mui/material/styles';

// Create theme, primary and secondary colours
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#a473ea',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export default theme;