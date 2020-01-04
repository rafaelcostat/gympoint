/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import { parseISO } from 'date-fns';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import Container from '~/components/Container';
import Header from '~/components/PageHeader';
import FormWrapper from '~/components/FormWrapper';
import LinkButton from '~/components/LinkButton';
import DatePicker from '~/components/DatePickerInput';

import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('E-mail é obrigatório'),
  birth: Yup.date().required('Data de nascimento é obrigatório'),
  weight: Yup.number().required('Peso é obrigatório'),
  height: Yup.number().required('Altura é obrigatória'),
});

export default function StudentForm() {
  const [student, setStudent] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function loadStudent() {
      try {
        const { data } = await api.get(`students/${id}`);

        setStudent({
          ...data,
          birth: parseISO(data.birth),
        });
      } catch (err) {
        toast.error('Erro ao carregar o aluno');
      }
    }
    if (id) {
      loadStudent();
    }
  }, [id]);

  async function handleSubmit(data) {
    if (id) {
      try {
        const { name, email, birth, weight, height } = data;

        await api.put(`students/${id}`, { name, email, birth, weight, height });

        toast.success('Usuário editado com sucesso.');

        history.push('/students');
      } catch (error) {
        toast.error('Não foi possível cadastrar o aluno.');
      }
    } else {
      try {
        const { name, email, birth, weight, height } = data;

        await api.post('students', { name, email, birth, weight, height });

        toast.success('Usuário cadastrado com sucesso.');

        history.push('/students');
      } catch (error) {
        toast.error('Não foi possível cadastrar o aluno.');
      }
    }
  }

  return (
    <Container width="900px">
      <Header>
        <h1>{id ? 'Edição de aluno' : 'Cadastro de aluno'}</h1>
        <div>
          <LinkButton to="/students" color="#ccc">
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
          initialData={student}
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Nome completo</label>
          <Input
            name="name"
            id="name"
            type="text"
            placeholder="Nome completo"
          />

          <label htmlFor="email">Endereço de e-email</label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="Endereço de e-mail"
          />

          <div>
            <div>
              <DatePicker name="birth" label="DATA DE NASCIMENTO" />
            </div>
            <div>
              <label htmlFor="weight">Peso (em kg)</label>
              <Input name="weight" id="weight" type="text" placeholder="Peso" />
            </div>
            <div>
              <label htmlFor="height">Altura</label>
              <Input
                name="height"
                id="height"
                type="text"
                placeholder="Altura"
              />
            </div>
          </div>
        </Form>
      </FormWrapper>
    </Container>
  );
}
