import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  background: #f2f2f2;
  flex: 1;
`;

export const Content = styled.View`
  padding: 20px;
`;

export const Question = styled.TextInput`
  height: 300px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 20px;
  font-size: 16px;
  line-height: 19px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
`;
