import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { MdArrowBack, MdCheck } from 'react-icons/md';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import Container from '~/components/Container';
import Header from '~/components/PageHeader';
import FormWrapper from '~/components/FormWrapper';
import LinkButton from '~/components/LinkButton';
import CurrencyInput from '~/components/CurrencyInput';

import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  title: Yup.string()
    .max(255, 'Título pode ter no máximo 255 caracteres')
    .required('Título é obrigatório'),
  duration: Yup.number()
    .min(1, 'Duração inválida')
    .typeError('Duração é obrigatório')
    .required('Duração é obrigatório'),
  price: Yup.number()
    .typeError('Preço é obrigatório')
    .required('Preço é obrigatório'),
});

export default function PlanForm() {
  const [plan, setPlan] = useState({});
  const [planPrice, setPlanPrice] = useState(0);
  const [planDuration, setPlanDuration] = useState(1);
  const { id } = useParams();

  const totalPrice = useMemo(() => {
    return planPrice * planDuration;
  }, [planPrice, planDuration]);

  useEffect(() => {
    async function loadPlan() {
      try {
        const { data } = await api.get(`plans/${id}`);

        setPlan(data);
        setPlanPrice(data.price);
        setPlanDuration(data.duration);
      } catch (error) {
        toast.error('Erro ao carregar plano');
      }
    }

    loadPlan();
  }, [id]);

  async function handleSubmit(data) {
    const { title, duration, price } = data;
    try {
      if (id) {
        await api.put(`plans/${id}`, { title, duration, price });
        toast.success('Plano salvo com sucesso.');
      } else {
        await api.post('plans', { title, duration, price });
        toast.success('Plano cadastrado com sucesso.');
      }

      history.push('/plans');
    } catch (error) {
      toast.error('Não foi possível salvar o plano.');
    }
  }

  return (
    <Container>
      <Header>
        <h1>Edição de aluno</h1>
        <div>
          <LinkButton to="/plans" color="#ccc">
            <MdArrowBack size={20} color="#FFF" />
            <span>Voltar</span>
          </LinkButton>
          <button type="submit" form="my-form">
            <MdCheck size={20} color="#fff" />
            <span>SALVAR</span>
          </button>
        </div>
      </Header>
      <FormWrapper>
        <Form
          id="my-form"
          schema={schema}
          initialData={plan}
          onSubmit={handleSubmit}
        >
          <Input
            name="title"
            id="title"
            type="text"
            placeholder="Título do plano"
            label="Título do plano"
          />

          <div>
            <div>
              <Input
                name="duration"
                id="duration"
                type="text"
                placeholder="Duração"
                label="Duração"
                onChange={e => setPlanDuration(e.target.value)}
              />
            </div>
            <div>
              <CurrencyInput
                name="price"
                value={planPrice}
                onChange={(masked, raw) => setPlanPrice(raw)}
                label="PREÇO MENSAL"
              />
            </div>

            <div>
              <CurrencyInput
                name="totalPrice"
                value={totalPrice}
                label="PREÇO TOTAL"
                disabled
              />
            </div>
          </div>
        </Form>
      </FormWrapper>
    </Container>
  );
}
