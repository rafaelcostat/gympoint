import styled from 'styled-components';
import { darken } from 'polished';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    font-size: 24px;
    color: #444444;
  }

  div {
    display: flex;
    align-items: center;
    a + button {
      margin-left: 16px;
    }
  }

  button {
    background: #ee4d64;
    height: 36px;
    color: #fff;
    border-radius: 4px;
    display: flex;
    align-items: center;
    transition: all 300ms;
    padding: 0 16px;
    margin-left: 16px;
    border: none;

    &:hover {
      background: ${darken(0.03, '#ee4d64')};
    }

    span {
      font-weight: bold;
      padding-left: 4px;
      text-transform: uppercase;
    }
  }
`;

export default PageHeader;
