import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Alert, ActivityIndicator } from 'react-native';
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
  Empty,
  Loading,
} from './styles';

export default function CheckIn() {
  const [checkIns, setCheckIns] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const student = useSelector(state => state.auth.student);

  async function loadCheckIns(newPage) {
    try {
      setRefreshing(true);
      const { data } = await api.get(`/students/${student.id}/checkins`, {
        params: { page: newPage },
      });

      const list = data.rows.map(checking => ({
        ...checking,
        formattedTime: formatRelative(
          parseISO(checking.createdAt),
          new Date(),
          { locale: pt }
        ),
      }));

      setCheckIns(newPage >= 2 ? [...checkIns, ...list] : list);
      setTotal(data.count);
      setTotalPages(data.total_pages);
      setPage(newPage);
    } catch (error) {
      Alert.alert('Erro na listagem de check-ins', 'Tente novamente!');
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadCheckIns(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loadMore() {
    const nextPage = page + 1;

    if (totalPages >= nextPage) {
      loadCheckIns(nextPage);
    }
  }

  function refreshList() {
    setCheckIns([]);
    loadCheckIns(1);
  }

  async function handleCheckIn() {
    try {
      const { data } = await api.post(`/students/${student.id}/checkins`);

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
          onEndReachedThreshold={0.1}
          onEndReached={loadMore}
          refreshing={refreshing}
          onRefresh={refreshList}
          renderItem={({ item, index }) => (
            <CheckInItem>
              <Number>{`Checkin #${total - index}`}</Number>
              <Time>{item.formattedTime}</Time>
            </CheckInItem>
          )}
          ListEmptyComponent={<Empty>Nenhum check-in realizado.</Empty>}
          ListFooterComponent={
            refreshing && (
              <Loading>
                <ActivityIndicator color="#ee4e62" />
              </Loading>
            )
          }
        />
      </Content>
    </Container>
  );
}
