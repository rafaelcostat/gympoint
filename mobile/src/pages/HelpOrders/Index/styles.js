import styled from 'styled-components';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #f5f5f5;
`;

export const Content = styled.View`
  padding: 20px;
`;

export const HelpOrdersList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: 80 },
})`
  margin-top: 10px;
`;

export const HelpOrder = styled.TouchableOpacity`
  padding: 20px;
  margin-top: 10px;
  border-radius: 4px;
  background: #fff;
  border: 1px solid #ddd;
`;

export const HelpOrderHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Answered = styled.Text`
  color: ${props => (props.answered ? '#42CB59' : '#999999')};
  font-weight: bold;
  font-size: 14px;
  margin-left: 8px;
`;

export const HelpOrderDate = styled.Text`
  flex: 1;
  text-align: right;
  color: #666;
  font-size: 14px;
`;

export const Question = styled.Text`
  margin-top: 16px;
  line-height: 20px;
  font-size: 14px;
`;
