import { FunctionComponent } from 'react';
import logo from '../../assets/logo.png';

interface LogoProps {
  width: string;
  margin?: string;
  position?: 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed';
  top?: number;
  left?: number;
}

const Logo: FunctionComponent<LogoProps> = ({
  width,
  margin,
  position,
  top,
  left,
}) => {
  return (
    <img
      src={logo}
      alt="Logo"
      style={{
        width: width,
        margin: margin,
        position: position,
        cursor: 'pointer',
        top: top,
        left: left,
      }}
    />
  );
};

export default Logo;
