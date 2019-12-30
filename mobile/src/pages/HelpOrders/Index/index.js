import React, { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
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
} from './styles';

import api from '~/services/api';

function HelpOrders({ navigation, isFocused }) {
  const [helpOrders, setHelpOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const student = useSelector(state => state.auth.student);

  const loadHelpOrders = useCallback(async () => {
    try {
      setRefreshing(true);
      const response = await api.get(`/students/${student.id}/help-orders`);
      const data = response.data.map(helpOrder => ({
        ...helpOrder,
        formattedDate: formatRelative(
          parseISO(helpOrder.createdAt),
          new Date(),
          { locale: pt }
        ),
      }));

      setHelpOrders(data);
    } catch (error) {
      Alert.alert('Erro ao listar pedidos de auxílio', 'Tente novamente');
    } finally {
      setRefreshing(false);
    }
  }, [student.id]);

  useEffect(() => {
    loadHelpOrders();
  }, [loadHelpOrders]);

  useEffect(() => {
    loadHelpOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

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
          refreshing={refreshing}
          onRefresh={loadHelpOrders}
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
