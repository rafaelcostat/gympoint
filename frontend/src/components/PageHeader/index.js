import styled from 'styled-components';

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
`;

export default PageHeader;
