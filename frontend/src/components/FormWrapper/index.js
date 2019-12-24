import styled from 'styled-components';
import { darken } from 'polished';

const FormWrapper = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 30px;

  form {
    display: flex;
    flex-direction: column;

    & > div {
      display: flex;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
      & > div {
        display: flex;
        flex: 1;
        flex-direction: column;
        margin-right: 15px;
        &:last-child {
          margin-right: 0;
        }
      }
    }

    input {
      border-radius: 4px;
      border: solid 1px #dddddd;
      background-color: #ffffff;
      height: 44px;
      padding: 0 15px;
      color: ${darken(0.3, '#999999')};
      margin: 0 0 10px;
      width: 100%;

      &::placeholder {
        color: #999999;
      }

      &:disabled {
        background: #f5f5f5;
      }
    }

    label {
      text-align: left;
      padding-bottom: 8px;
      padding-top: 10px;
      text-transform: uppercase;
      font-weight: bold;
      color: #444444;
    }
  }
`;

export default FormWrapper;
