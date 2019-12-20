import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';

import { Content } from './styles';
import Container from '~/components/Container';
import Header from '~/components/PageHeader';
import { Table, EditLink, DeleteButton } from '~/components/Table';
import LinkButton from '~/components/LinkButton';

import api from '~/services/api';

export default function Students() {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      setLoading(true);

      const response = await api.get('students');

      setStudents(response.data);

      setLoading(false);
    }

    loadStudents();
  }, []);

  function handleDeleteStudent() {}

  return (
    <Container>
      <Header>
        <h1>Gerenciar alunos</h1>
        <div>
          <LinkButton to="/students/new" color="#ee4d64">
            <MdAdd size={20} color="#FFF" />
            <span>CADASTRAR</span>
          </LinkButton>
        </div>
      </Header>
      <Content>
        <Table>
          <thead>
            <tr>
              <th>NOME</th>
              <th>E-MAIL</th>
              <th style={{ textAlign: 'center' }}>IDADE</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3">Carregando...</td>
              </tr>
            ) : (
              students.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td style={{ textAlign: 'center' }}>{student.age}</td>
                  <td style={{ textAlign: 'center' }}>
                    <EditLink to={`/students/${student.id}`}>editar</EditLink>
                    <DeleteButton
                      type="button"
                      color="danger"
                      onClick={() => handleDeleteStudent(student)}
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
