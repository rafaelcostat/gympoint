import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { formatDistanceStrict, addMonths } from 'date-fns';
import { toast } from 'react-toastify';
import pt from 'date-fns/locale/pt';

import { Content } from './styles';
import Container from '~/components/Container';
import Header from '~/components/PageHeader';
import { Table, EditLink, DeleteButton } from '~/components/Table';
import LinkButton from '~/components/LinkButton';

import api from '~/services/api';
import { formatPrice } from '~/util/format';

// import { Container } from './styles';

export default function Plans() {
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      try {
        setLoading(true);

        const response = await api.get('plans');

        const data = response.data.map(plan => ({
          ...plan,
          priceFormatted: formatPrice(plan.price),
          durationFormatted: formatDistanceStrict(
            addMonths(new Date(), plan.duration),
            new Date(),
            { locale: pt }
          ),
        }));

        setPlans(data);
      } catch (error) {
        toast.error('Erro ao carregar planos');
      }

      setLoading(false);
    }

    loadPlans();
  }, []);

  function handleDeletePlan() {}

  return (
    <Container>
      <Header>
        <h1>Gereciando planos</h1>
        <div>
          <LinkButton to="/plans/new" color="#ee4d64">
            <MdAdd size={20} color="#FFF" />
            <span>CADASTRAR</span>
          </LinkButton>
        </div>
      </Header>
      <Content>
        <Table>
          <thead>
            <tr>
              <th>TÍTULO</th>
              <th style={{ textAlign: 'center' }}>DURAÇÃO</th>
              <th style={{ textAlign: 'center' }}>VALOR P/ MÊS</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3">Carregando...</td>
              </tr>
            ) : (
              plans.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.title}</td>
                  <td style={{ textAlign: 'center' }}>
                    {plan.durationFormatted}
                  </td>
                  <td style={{ textAlign: 'center' }}>{plan.priceFormatted}</td>
                  <td style={{ textAlign: 'center' }}>
                    <EditLink to={`/plans/${plan.id}`}>editar</EditLink>
                    <DeleteButton
                      type="button"
                      color="danger"
                      onClick={() => handleDeletePlan(plan)}
                    >
                      excluir
                    </DeleteButton>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Content>
    </Container>
  );
}
