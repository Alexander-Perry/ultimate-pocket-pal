import { createTheme } from '@mui/material/styles';

// Create theme, primary and secondary colours
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#802eea',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export default theme;