import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

const LinkButton = styled(Link)`
  background: ${props => props.color};
  height: 36px;
  color: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  transition: all 300ms;
  padding: 0 16px;

  &:hover {
    background: ${props => darken(0.03, props.color)};
  }

  span {
    font-weight: bold;
  }
`;

export default LinkButton;
