import styled from 'styled-components';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #f5f5f5;
`;

export const Content = styled.View`
  padding: 20px;
`;

export const QuestionContent = styled.View`
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 50px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: #fff;
`;

export const QuestionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #444444;
  margin-bottom: 16px;
`;

export const QuestionTime = styled.Text`
  font-size: 14px;
  color: #666666;
`;

export const Question = styled.Text`
  font-size: 14px;
  color: #666666;
  margin-bottom: 20px;
`;

export const Answer = styled.Text`
  font-size: 14px;
  color: #666666;
`;
