import styled from '@emotion/styled';
import { Avatar } from '@mui/material';
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
  return (
    <Nav>
      <Logo />
      <Avatar />
    </Nav>
  );
}

export default Navbar;
