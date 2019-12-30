import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';

import Header from '~/components/Header';

import { Container, Content, Question, SubmitButton } from './styles';

import api from '~/services/api';

export default function HelpOrderNew({ navigation }) {
  const [question, setQuestion] = useState('');
  const [disabled, setDisabled] = useState(true);

  const student = useSelector(state => state.auth.student);

  useEffect(() => setDisabled(!question.length), [question]);

  async function handleSubmit() {
    try {
      if (question) {
        await api.post(`/students/${student.id}/help-orders`, {
          question,
        });
        Alert.alert('Sucesso', 'Pedido de auxílio enviado com sucesso');
        navigation.goBack();
      } else {
        Alert.alert('Preencha sua pergunta', 'O campo não pode estar vazio');
      }
    } catch (error) {
      Alert.alert('Erro ao enviar pergunta', 'Tente novamente');
    }
  }

  return (
    <Container>
      <Header />

      <Content>
        <Question
          placeholder="Inclua seu pedido de auxílio"
          textAlignVertical="top"
          multiline
          value={question}
          onChangeText={setQuestion}
        />
        <SubmitButton onPress={handleSubmit} disabled={disabled}>
          Enviar pedido
        </SubmitButton>
      </Content>
    </Container>
  );
}

HelpOrderNew.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
