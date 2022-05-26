import { createTheme } from '@mui/material/styles';

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#e50914',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fff',
      contrastText: '#000',
    },
    info: {
      main: 'rgba(42,42,42,.6)',
      contrastText: '#fff',
    },
    background: {
      paper: '#141414',
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        color: '#fff',
      },
    },
  },
});
