import styled from 'styled-components';
import Modal from 'react-modal';

export const Content = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 30px;
`;

export const Button = styled.button`
  border: none;
  color: #4d85ee;
`;

const customStyles = {
  overlay: { background: 'rgba(0, 0, 0, 0.7)' },
};

export const HelpModal = styled(Modal).attrs({
  style: customStyles,
})`
  width: 450px;
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 30px;
  border-radius: 4px;
  transition: all 300ms;
  strong {
    color: #444;
    font-size: 16px;
  }

  span {
    font-size: 16px;
    line-height: 1.5;
    color: #666;
    margin-bottom: 18px;
    margin-top: 8px;
  }

  form {
    display: flex;
    flex-direction: column;
    textarea {
      margin-top: 8px;
      height: 127px;
      line-height: 18px;
      font-size: 16px;
      border: 1px solid #dddddd;
      background: none;
      resize: none;
      padding: 10px;
      border-radius: 4px;
    }
  }
`;
