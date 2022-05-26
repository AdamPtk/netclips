import { Box, Container } from '@mui/material';
import React from 'react';
import Logo from './atoms/Logo';

function Footer() {
  return (
    <Box display="flex" justifyContent="center" p={8}>
      <Logo width="100px" />
    </Box>
  );
}

export default Footer;
