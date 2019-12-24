import styled from 'styled-components';
import { darken } from 'polished';

const ActionButton = styled.button`
  height: 36px;
  background: #ee4d64;
  color: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 300ms;
  border: none;
  margin-top: ${props => (props.top ? props.top : 0)};

  &:hover {
    background: ${darken(0.03, '#ee4d64')};
  }
`;

export default ActionButton;
