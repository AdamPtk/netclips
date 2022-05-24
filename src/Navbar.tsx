import styled from '@emotion/styled';
import { Avatar, Grid } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useEffect, useState } from 'react';
import Logo from './Logo';

const Nav = styled('div')({
  position: 'fixed',
  top: 0,
  right: 0,
  left: 0,
  zIndex: 9999,
  display: 'flex',
  justifyContent: 'space-between',
  padding: '20px 50px',
  backgroundColor: '#000',
});

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
      p={3}
      justifyContent="space-between"
      alignItems="center"
      position="fixed"
      zIndex={9999}
      bgcolor={`${bg ? '#000' : 'transparent'}`}
      style={{
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
