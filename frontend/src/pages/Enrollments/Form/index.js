import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import { Form } from '@rocketseat/unform';
import { parseISO, addMonths } from 'date-fns';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import Container from '~/components/Container';
import Header from '~/components/PageHeader';
import FormWrapper from '~/components/FormWrapper';
import LinkButton from '~/components/LinkButton';
import Select from '~/components/SelectInput';
import DatePickerInput from '~/components/DatePickerInput';
import NumberInput from '~/components/NumberInput';

import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  student_id: Yup.number()
    .typeError('Aluno é obrigatório')
    .required('Aluno é obrigatório'),
  plan_id: Yup.number()
    .typeError('Plano é obrigatório')
    .required('Plano é obrigatório'),
  start_date: Yup.date().required('Data de início é obrigatório'),
});

export default function EnrollmentForm() {
  const [loading, setLoading] = useState(false);
  const [enrollment, setEnrollment] = useState({});
  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState({});
  const [selectedStartDate, setSelectedStartDate] = useState();

  const { id } = useParams();

  const endDate = useMemo(() => {
    return addMonths(selectedStartDate, selectedPlan.duration);
  }, [selectedPlan, selectedStartDate]);

  const totalPrice = useMemo(() => {
    return selectedPlan.duration * selectedPlan.price;
  }, [selectedPlan]);

  const loadStudents = useCallback(async inputValues => {
    try {
      setLoading(true);

      const response = await api.get('students', {
        params: {
          q: inputValues,
        },
      });

      const data = response.data.map(student => ({
        id: student.id,
        title: student.name,
      }));

      setStudents(data);
      return data;
    } catch (error) {
      return toast.error('Erro ao carregar os alunos.');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadPlans = useCallback(async inputValues => {
    try {
      setLoading(true);

      const { data } = await api.get('plans', {
        params: {
          q: inputValues,
        },
      });

      setPlans(data);
      return data;
    } catch (error) {
      return toast.error('Erro ao carregar os planos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    async function loadEnrollment() {
      try {
        const { data } = await api.get(`enrollments/${id}`);

        setSelectedStartDate(parseISO(data.start_date));
        setSelectedPlan(data.plan);

        setEnrollment({
          start_date: parseISO(data.start_date),
          student_id: data.student.id,
          plan_id: data.plan.id,
        });
      } catch (error) {
        toast.error('Erro ao carregar plano');
      }
    }

    if (id) {
      loadEnrollment();
    }

    loadPlans();
    loadStudents();
  }, [id]); //eslint-disable-line

  async function handleSubmit(data) {
    if (id) {
      try {
        setLoading(true);
        const { student_id, plan_id, start_date } = data;

        await api.put(`enrollments/${id}`, { student_id, plan_id, start_date });

        toast.success('Matrícula editada com sucesso.');
        history.push('/enrollments');
      } catch (error) {
        toast.error('Não foi possível editar a matrícula.');
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const { student_id, plan_id, start_date } = data;

        await api.post('enrollments', { student_id, plan_id, start_date });

        toast.success('Matrícula cadastrado com sucesso.');
        history.push('/enrollments');
      } catch (error) {
        toast.error('Não foi possível realizar a matrícula.');
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <Container width="900px">
      <Header>
        <h1>{id ? 'Edição de matrícula' : 'Cadastro de matrícula'}</h1>
        <div>
          <LinkButton to="/enrollments" color="#ccc">
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
          initialData={enrollment}
          onSubmit={handleSubmit}
        >
          <div>
            <Select
              name="student_id"
              isDisabled={loading}
              options={students}
              label="ALUNO"
              placeholder="Buscar aluno"
              noOptionsMessage={() => 'Não há alunos'}
              loadOptions={loadStudents}
              cacheOptions
            />
          </div>

          <div>
            <div>
              <Select
                noOptionsMessage={() => 'Não há planos'}
                isDisabled={loading}
                name="plan_id"
                options={plans}
                onChange={setSelectedPlan}
                loadOptions={loadPlans}
                label="PLANO"
                placeholder="Selecione o plano"
                cacheOptions
              />
            </div>
            <div>
              <DatePickerInput
                className="normal-input"
                name="start_date"
                label="DATA DE INÍCIO"
                onChange={setSelectedStartDate}
              />
            </div>

            <div>
              <DatePickerInput
                name="end_date"
                label="DATA DE TÉRMINO"
                value={endDate}
                disabled
              />
            </div>
            <div>
              <NumberInput
                name="totalPrice"
                value={totalPrice}
                prefix="R$"
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
