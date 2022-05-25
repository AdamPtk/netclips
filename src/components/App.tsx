import { ThemeProvider } from '@mui/material/styles';
import { defaultTheme } from '../themes/defaultTheme';
import MainScreen from './MainScreen';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <MainScreen />
    </ThemeProvider>
  );
}

export default App;
