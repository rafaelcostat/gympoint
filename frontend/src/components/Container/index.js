import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: ${props => (props.width ? props.width : '1200px')};
  margin: 30px auto;
  align-self: center;
`;

export default Container;
