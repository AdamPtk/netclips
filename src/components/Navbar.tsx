import { useEffect, useState } from 'react';
import { Avatar, Button, Grid } from '@mui/material';
import Logo from './atoms/Logo';
import { defaultTheme } from '../themes/defaultTheme';
import { authorization } from '../api/authorization';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [bg, setBg] = useState<Boolean>(false);
  const navigate = useNavigate();

  const bgTransition = () => {
    if (window.scrollY > 100) {
      setBg(true);
    } else {
      setBg(false);
    }
  };

  const logout = () => {
    authorization().logout();
    navigate('/');
  };

  const fullName = window.sessionStorage.getItem('fullname');

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
        <Logo width="100px" />
      </Grid>
      <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
        <Grid p={1} item>
          <Button variant="contained" size="small" onClick={logout}>
            Sign Out
          </Button>
        </Grid>
        <Grid item>
          <Avatar>{fullName && fullName[0]}</Avatar>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Navbar;
