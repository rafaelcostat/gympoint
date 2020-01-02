import React from 'react';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Logo, LogoImage, LogoText, SignOutButton } from './styles';
import logo from '~/assets/logo-icon.png';

import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Logo>
        <LogoImage source={logo} />
        <LogoText>GYMPOINT</LogoText>
      </Logo>
      <SignOutButton onPress={handleSignOut}>
        <Icon name="exit-to-app" size={20} color="#999" />
      </SignOutButton>
    </Container>
  );
}
