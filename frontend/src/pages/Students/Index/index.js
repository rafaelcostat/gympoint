import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import { toast } from 'react-toastify';
import Pagination from 'rc-pagination';

import { Content, Search } from './styles';
import Container from '~/components/Container';
import Header from '~/components/PageHeader';
import PaginationContainer from '~/components/PaginationContainer';
import { Table, EditLink, DeleteButton } from '~/components/Table';
import LinkButton from '~/components/LinkButton';

import api from '~/services/api';

export default function Students() {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [filter, setFilter] = useState('');

  const pageSize = 5;

  useEffect(() => {
    async function loadStudents() {
      try {
        setLoading(true);

        const response = await api.get('students', {
          params: {
            page,
            limit: pageSize,
            q: filter,
          },
        });

        setStudents(response.data);
        setTotal(Number(response.headers.total));
      } catch (error) {
        toast.error('Erro ao carregar matrículas');
      } finally {
        setLoading(false);
      }
    }

    loadStudents();
  }, [filter, page]);

  async function deleteStudent(student) {
    try {
      await api.delete(`/students/${student.id}`);

      toast.success('Aluno excluído com sucesso.');

      setStudents(
        students.filter(currentStudent => currentStudent.id !== student.id)
      );
    } catch (error) {
      toast.error('Não foi possível excluir este aluno.');
    }
  }

  function handleDeleteStudent(student) {
    const del = window.confirm('Deseja realmente excluir o aluno?');

    if (del) {
      deleteStudent(student);
    }
  }

  function handlePagination(currentPage) {
    setPage(currentPage);
  }

  function handleSearch(e) {
    setFilter(e.target.value);
  }

  return (
    <Container>
      <Header>
        <h1>Gerenciar alunos</h1>
        <div>
          <LinkButton to="/students/new" color="#ee4d64">
            <MdAdd size={20} color="#FFF" />
            <span>CADASTRAR</span>
          </LinkButton>
          <Search>
            <MdSearch color="#999999" size={16} />
            <input
              name="studentName"
              placeholder="Buscar aluno"
              onChange={handleSearch}
            />
          </Search>
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
        <PaginationContainer>
          <Pagination
            onChange={handlePagination}
            pageSize={pageSize}
            current={page}
            total={total}
          />
        </PaginationContainer>
      </Content>
    </Container>
  );
}
