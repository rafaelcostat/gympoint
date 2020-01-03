import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #f5f5f5;
`;

export const Content = styled.View`
  padding: 20px;
  flex: 1;
`;

export const CheckInList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 33px;
`;

export const CheckInItem = styled.View`
  background: #fff;
  border-radius: 4px;
  border: 1px solid #dddddd;
  padding: 15px 20px;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Number = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #444;
`;

export const Time = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const Empty = styled.Text`
  margin-top: 30px;
  font-size: 22px;
  text-align: center;
  color: #bbb;
`;

export const Loading = styled.View`
  margin-top: 15px;
`;
