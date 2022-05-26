import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { defaultTheme } from '../themes/defaultTheme';
import MainScreen from './MainScreen';
import SplashScreen from './SplashScreen';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <ThemeProvider theme={defaultTheme}>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/home" element={<MainScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
