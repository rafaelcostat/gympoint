import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Button from '~/components/Button';
import Header from '~/components/Header';
import {
  Container,
  Content,
  CheckInList,
  CheckInItem,
  Number,
  Time,
} from './styles';

export default function CheckIn() {
  const [checkIns, setCheckIns] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [total, setTotal] = useState(0);

  const student = useSelector(state => state.auth.student);

  const loadCheckIns = useCallback(async () => {
    try {
      setRefreshing(true);
      const response = await api.get(`/students/${student.id}/checkins`);
      const data = response.data.map(checking => ({
        ...checking,
        formattedTime: formatRelative(
          parseISO(checking.createdAt),
          new Date(),
          { locale: pt }
        ),
      }));

      setTotal(data.length);
      setCheckIns(data);
    } catch (error) {
      Alert.alert('Erro na listagem de check-ins', 'Tente novamente!');
    } finally {
      setRefreshing(false);
    }
  }, [student.id]);

  useEffect(() => {
    loadCheckIns();
  }, [loadCheckIns]);

  async function handleCheckIn() {
    try {
      const { data } = await api.post(`/students/${student.id}/checkins`);
      console.tron.log(data);

      const newCheckIns = [
        {
          ...data,
          formattedId: `Check-in #${data.id}`,
          formattedTime: formatRelative(parseISO(data.createdAt), new Date(), {
            locale: pt,
          }),
        },
        ...checkIns,
      ];

      setCheckIns(newCheckIns);
      setTotal(total + 1);
    } catch (error) {
      Alert.alert('Erro', error.response.data.error);
    }
  }
  return (
    <Container>
      <Header />
      <Content>
        <Button onPress={handleCheckIn}>Novo check-in</Button>
        <CheckInList
          data={checkIns}
          keyExtractor={checkIn => String(checkIn.id)}
          refreshing={refreshing}
          onRefresh={loadCheckIns}
          renderItem={({ item, index }) => (
            <CheckInItem>
              <Number>{`Checkin #${total - index}`}</Number>
              <Time>{item.formattedTime}</Time>
            </CheckInItem>
          )}
        />
      </Content>
    </Container>
  );
}

CheckIn.navigationOptions = {
  tabBarLabel: 'Check-In',
};
