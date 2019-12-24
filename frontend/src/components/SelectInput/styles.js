import styled from 'styled-components';

export const SelectInputWrapper = styled.div`
  label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-weight: bold;
    color: #444;
    font-size: 14px;
    line-height: 16px;
  }
  & > div > div:nth-child(1),
  & > div > div:nth-child(2) {
    border: solid 1px #dddddd;
    border-radius: 4px;
    padding: 0 15px;
    color: #444;
    width: 100%;
    height: 45px;
    &::placeholder {
      color: #444;
      height: 19px;
      margin: 0 0 10px;
      font-size: 16px;
      line-height: 19px;
    }

    & > div {
      height: 45px;
      position: unset;
    }
  }

  span {
    margin-top: 8px;
    color: #444;
    align-self: flex-start;
    font-weight: bold;
  }
`;
