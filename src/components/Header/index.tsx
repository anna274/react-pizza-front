import React from 'react';
import { HeaderContainer, StyledLogo, LogoName, LogoDescription, LogoContainer } from './styled';
import Logo from 'assets/images/logo.png';

interface IProps {
  children?: JSX.Element;
}

export const Header: React.FC<IProps> = ({ children }) => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <StyledLogo src={Logo} />
        <LogoName>REACT PIZZA</LogoName>
        <LogoDescription>самая вкусная пицца во вселенной</LogoDescription>
      </LogoContainer>

      {children}
    </HeaderContainer>
  );
};
