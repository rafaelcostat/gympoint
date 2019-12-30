import React from 'react';
import { Container, LogoImage, LogoText } from './styles';
import logo from '~/assets/logo-icon.png';

export default function Header() {
  return (
    <Container>
      <LogoImage source={logo} />
      <LogoText>GYMPOINT</LogoText>
    </Container>
  );
}
