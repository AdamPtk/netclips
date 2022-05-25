import { useEffect, useState } from 'react';
import { Avatar, Grid } from '@mui/material';
import Logo from './atoms/Logo';
import { defaultTheme } from '../themes/defaultTheme';

function Navbar() {
  const [bg, setBg] = useState<Boolean>(false);

  const bgTransition = () => {
    if (window.scrollY > 100) {
      setBg(true);
    } else {
      setBg(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', bgTransition);
    return () => window.removeEventListener('scroll', bgTransition);
  }, []);

  return (
    <Grid
      container
      py={2}
      px={6}
      justifyContent="space-between"
      alignItems="center"
      position="fixed"
      zIndex={9999}
      bgcolor={`${bg && defaultTheme.palette.background.paper}`}
      sx={{
        backgroundImage:
          'linear-gradient(to bottom,rgba(0,0,0,.7) 10%,rgba(0,0,0,0))',
        transition: 'all 0.5s',
      }}
    >
      <Grid item>
        <Logo />
      </Grid>
      <Grid item>
        <Avatar />
      </Grid>
    </Grid>
  );
}

export default Navbar;
