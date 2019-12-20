import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: left;
  tr {
    color: #666;
    font-size: 16px;
    line-height: 20px;
  }
  tr + tr {
    border-top: 1px solid #ddd;
  }
  td,
  th {
    padding: 16px 0;
  }
`;

export const EditLink = styled(Link)`
  color: #4d85ee;
  font-size: 15px;
  padding: 0 11px;
  transition: color 300ms;

  &:hover {
    color: ${darken(0.1, '#4d85ee')};
  }
`;

export const DeleteButton = styled.button`
  color: #de3b3b;
  font-size: 15px;
  border: none;
  padding: 0 11px;

  &:hover {
    color: ${darken(0.1, '#de3b3b')};
  }
`;
