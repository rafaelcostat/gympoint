import React, { useState, useEffect } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from '~/components/Header';
import Button from '~/components/Button';

import {
  Container,
  Content,
  HelpOrdersList,
  HelpOrder,
  HelpOrderHeader,
  Answered,
  HelpOrderDate,
  Question,
  Empty,
  Loading,
} from './styles';

import api from '~/services/api';

function HelpOrders({ navigation, isFocused }) {
  const [helpOrders, setHelpOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const student = useSelector(state => state.auth.student);

  async function loadHelpOrders(newPage) {
    try {
      setRefreshing(true);
      const { data } = await api.get(`/students/${student.id}/help-orders`, {
        params: { page: newPage },
      });

      const list = data.rows.map(helpOrder => ({
        ...helpOrder,
        formattedDate: formatRelative(
          parseISO(helpOrder.createdAt),
          new Date(),
          { locale: pt }
        ),
      }));

      setHelpOrders(newPage >= 2 ? [...helpOrders, ...list] : list);
      setTotalPages(data.total_pages);
      setPage(newPage);
    } catch (error) {
      Alert.alert('Erro ao listar pedidos de auxílio', 'Tente novamente');
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadHelpOrders(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadHelpOrders(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  function loadMore() {
    const nextPage = page + 1;

    if (totalPages >= nextPage) {
      loadHelpOrders(nextPage);
    }
  }

  function refreshList() {
    setHelpOrders([]);
    loadHelpOrders(1);
  }

  return (
    <Container>
      <Header />
      <Content>
        <Button onPress={() => navigation.navigate('HelpOrderNew')}>
          Novo pedido de auxílio
        </Button>
        <HelpOrdersList
          data={helpOrders}
          keyExtractor={helpOrder => String(helpOrder.id)}
          onEndReachedThreshold={0.1}
          onEndReached={loadMore}
          refreshing={refreshing}
          onRefresh={refreshList}
          renderItem={({ item }) => (
            <HelpOrder
              onPress={() => navigation.navigate('HelpOrderShow', { item })}>
              <HelpOrderHeader>
                <Icon
                  name="check-circle"
                  color={item.answer ? '#42CB59' : '#999999'}
                  size={16}
                />
                <Answered answered={item.answer}>
                  {item.answer ? 'Respondido' : 'Sem resposta'}
                </Answered>
                <HelpOrderDate>{item.formattedDate}</HelpOrderDate>
              </HelpOrderHeader>
              <Question>{item.question}</Question>
            </HelpOrder>
          )}
          ListEmptyComponent={
            <Empty>Nenhum pedido de auxílio realizado.</Empty>
          }
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

HelpOrders.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    addListener: PropTypes.func,
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(HelpOrders);
