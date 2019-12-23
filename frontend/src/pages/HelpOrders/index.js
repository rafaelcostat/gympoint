import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Form, Input } from '@rocketseat/unform';
import Container from '~/components/Container';
import Header from '~/components/PageHeader';
import { Table } from '~/components/Table';
import ActionButton from '~/components/ActionButton';
import { HelpModal, Content, Button } from './styles';

import api from '~/services/api';

HelpModal.setAppElement('#root');

const schema = Yup.object().shape({
  answer: Yup.string().required('Campo obrigatório'),
});

export default function HelpOrders() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedHelpOrder, setSelectedHelpOrder] = useState({});

  useEffect(() => {
    async function loadHelpOrders() {
      try {
        setLoading(true);
        const response = await api.get('/help-orders');

        setHelpOrders(response.data);
        setLoading(false);
      } catch (error) {
        toast.error('Não foi possível carregar os pedidos de auxílio.');
      }
    }

    loadHelpOrders();
  }, []);

  function handleAnswerHelpOrder(helpOrder) {
    setSelectedHelpOrder(helpOrder);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  async function handleSubmit() {
    try {
      await api.put(`help-orders/${selectedHelpOrder.id}/answer`, {
        answer: selectedHelpOrder.answer,
      });

      toast.success('Pedido de ajuda respondido com sucesso.');

      setHelpOrders(
        helpOrders.filter(item => item.id !== selectedHelpOrder.id)
      );

      closeModal();
    } catch (error) {
      toast.error('Não foi possível responder à este pedido de ajuda.');
    }
  }

  return (
    <Container width="700px">
      <Header>
        <h1>Pedidos de auxílio</h1>
      </Header>
      <Content>
        <Table>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3">Carregando...</td>
              </tr>
            ) : (
              helpOrders.map(helpOrder => (
                <tr key={helpOrder.id}>
                  <td>{helpOrder.student.name}</td>
                  <td style={{ textAlign: 'right' }}>
                    <Button
                      type="button"
                      onClick={() => handleAnswerHelpOrder(helpOrder)}
                    >
                      responder
                    </Button>
                  </td>
                </tr>
              ))
            )}
            {!helpOrders.length && !loading && (
              <tr>
                <td colSpan="2">
                  <span>Não há pedidos de ajuda para serem exibidos.</span>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Content>
      <HelpModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Pergunta do aluno"
      >
        <strong>PERGUNTA DO ALUNO</strong>
        <span>{selectedHelpOrder && selectedHelpOrder.question}</span>
        <strong>SUA RESPOSTA</strong>
        <Form schema={schema} onSubmit={handleSubmit}>
          <Input
            multiline
            name="answer"
            placeholder="Sua resposta aqui..."
            onChange={e =>
              setSelectedHelpOrder({
                ...selectedHelpOrder,
                answer: e.target.value,
              })
            }
          />
          <ActionButton top="21px" type="submit">
            Responder aluno
          </ActionButton>
        </Form>
      </HelpModal>
    </Container>
  );
}
