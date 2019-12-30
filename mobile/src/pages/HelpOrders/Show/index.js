import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';

import {
  Container,
  Content,
  QuestionContent,
  QuestionHeader,
  Title,
  QuestionTime,
  Question,
  Answer,
} from './styles';

export default function HelpOrderShow({ navigation }) {
  const helpOrder = navigation.getParam('item');

  return (
    <Container>
      <Header />
      <Content>
        <QuestionContent>
          <QuestionHeader>
            <Title>PERGUNTA</Title>
            <QuestionTime>{helpOrder.formattedDate}</QuestionTime>
          </QuestionHeader>
          <Question>{helpOrder.question}</Question>

          {helpOrder.answer && (
            <>
              <Title>RESPOSTA</Title>
              <Answer>{helpOrder.answer}</Answer>
            </>
          )}
        </QuestionContent>
      </Content>
    </Container>
  );
}

HelpOrderShow.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
