import styled from 'styled-components';

export const Content = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 30px;
`;

export const Search = styled.span`
  position: relative;
  margin-left: 16px;

  input {
    padding: 5px 5px 5px 40px;
    height: 36px;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #999;
    font-size: 14px;
  }
  svg {
    position: absolute;
    top: 11px;
    left: 16px;
  }
`;
