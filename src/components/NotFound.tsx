import { Box, Typography } from '@mui/material';
import React from 'react';
import Logo from './atoms/Logo';

function NotFound() {
  return (
    <Box
      height="100vh"
      sx={{
        backgroundImage: `url("https://i0.wp.com/trenddirectsr.com/wp-content/uploads/2021/05/netflix-banner.png?fit=1200%2C675&ssl=1")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          background:
            'radial-gradient(transparent 50%, rgba(20, 20, 20, 0.6));',
        }}
      >
        <Logo
          width="200px"
          margin="20px 50px"
          position="absolute"
          top={0}
          left={0}
        />
        <Typography
          variant="h5"
          fontWeight="600"
          width="60%"
          textAlign="center"
        >
          Page not found.
        </Typography>
      </Box>
    </Box>
  );
}

export default NotFound;
