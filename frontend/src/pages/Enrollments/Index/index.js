import React, { useEffect, useState } from 'react';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Container from '~/components/Container';
import Header from '~/components/PageHeader';
import LinkButton from '~/components/LinkButton';
import { Table, EditLink, DeleteButton } from '~/components/Table';

import api from '~/services/api';

import { Content } from './styles';

export default function Enrollments() {
  const [loading, setLoading] = useState(false);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    async function loadEnrollments() {
      try {
        setLoading(true);

        const response = await api.get('enrollments');

        const data = response.data.map(enrollment => ({
          ...enrollment,
          start_date_formatted: format(
            parseISO(enrollment.start_date),
            "dd 'de' MMMM 'de' yyyy",
            { locale: pt }
          ),
          end_date_formatted: format(
            parseISO(enrollment.end_date),
            "dd 'de' MMMM 'de' yyyy",
            { locale: pt }
          ),
        }));

        setEnrollments(data);
      } catch (error) {
        toast.error('Erro ao carregar matrículas');
      }

      setLoading(false);
    }

    loadEnrollments();
  }, []);

  function handleDeleteEnrollment() {}

  return (
    <Container>
      <Header>
        <h1>Gereciando matrículas</h1>
        <div>
          <LinkButton to="/enrollments/new" color="#ee4d64">
            <MdAdd size={20} color="#FFF" />
            <span>CADASTRAR</span>
          </LinkButton>
        </div>
      </Header>
      <Content>
        <Table>
          <thead>
            <tr>
              <th style={{ minWidth: '150px' }}>ALUNO</th>
              <th style={{ textAlign: 'center' }}>PLANO</th>
              <th style={{ textAlign: 'center' }}>ÍNICIO</th>
              <th style={{ textAlign: 'center' }}>TÉRMINO</th>
              <th style={{ textAlign: 'center' }}>ATIVA</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3">Carregando...</td>
              </tr>
            ) : (
              enrollments.map(enrollment => (
                <tr key={enrollment.id}>
                  <td>{enrollment.student.name}</td>
                  <td style={{ textAlign: 'center' }}>
                    {enrollment.plan.title}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {enrollment.start_date_formatted}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {enrollment.end_date_formatted}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {enrollment.active}
                    {enrollment.active ? (
                      <MdCheckCircle color="#42cb59" size={24} />
                    ) : (
                      <MdCheckCircle color="#dddddd" size={24} />
                    )}
                  </td>

                  <td style={{ textAlign: 'center' }}>
                    <EditLink to={`/enrollments/${enrollment.id}`}>
                      editar
                    </EditLink>
                    <DeleteButton
                      type="button"
                      color="danger"
                      onClick={() => handleDeleteEnrollment(enrollment)}
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
