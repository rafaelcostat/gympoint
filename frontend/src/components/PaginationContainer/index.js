import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  .rc-pagination-item:hover {
    border-color: #ee4d64;
    a {
      color: #ee4d64;
    }
  }
  .rc-pagination-item-active {
    background-color: #ee4d64;
    border-color: #ee4d64;
    &:hover {
      a {
        color: #fff;
      }
    }
  }
`;

export default PaginationContainer;
