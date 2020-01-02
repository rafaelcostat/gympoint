import styled from 'styled-components';

export const Container = styled.View`
  background: #fff;
  height: 44px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 5px;
`;

export const Logo = styled.View`
  flex-direction: row;
`;

export const LogoImage = styled.Image`
  width: 36px;
  height: 18px;
`;

export const LogoText = styled.Text`
  font-size: 14px;
  line-height: 16px;
  font-weight: bold;
  color: #ee4e62;
  margin-left: 8px;
`;

export const SignOutButton = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
`;
