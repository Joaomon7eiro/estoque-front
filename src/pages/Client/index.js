import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { MdPeople, MdSearch, MdRefresh, MdClose } from 'react-icons/md';

import {
  SubmitButton,
  Form,
  List,
  TitleContainer,
  AddButton,
  SearchContainer,
  PaginationContainer,
} from './styles';

import Container from '../../components/Container';

import api from '../../services/api';

export default class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientSearch: '',
      clients: [],
      loading: false,
      showSearch: false,
      lastSearch: '',
      page: 1,
      totalPages: 1,
    };
  }

  async componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/clients`, {
      params: {
        page,
      },
    });

    this.setState({ totalPages: response.data.totalPages });

    const clients = response.data.clients.map(client => {
      return {
        id: client.id,
        name: client.name,
      };
    });

    this.setState({
      clients,
      page,
    });
  };

  prevPage = () => {
    const { page } = this.state;

    if (page === 1) return;

    const pageNumber = page - 1;

    this.loadProducts(pageNumber);
  };

  nextPage = () => {
    const { page, totalPages } = this.state;

    if (page === totalPages) return;

    const pageNumber = page + 1;

    this.loadProducts(pageNumber);
  };

  handleInputChange = async e => {
    this.setState({ clientSearch: e.target.value });
  };

  handleDeleteSearch = async () => {
    await this.loadProducts();

    this.setState({
      lastSearch: '',
      showSearch: false,
    });
  };

  handleDelete = async id => {
    await api.delete(`/clients/${id}`);
    this.loadProducts();
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { clientSearch } = this.state;

    if (clientSearch.length === 0) return;

    this.setState({ loading: true });

    const response = await api.get(`/clients`, {
      params: {
        query: clientSearch,
      },
    });

    this.setState({ totalPages: response.data.totalPages });

    const clients = response.data.clients.map(client => {
      return {
        id: client.id,
        name: client.name,
      };
    });

    this.setState({
      clients,
      loading: false,
      showSearch: true,
      clientSearch: '',
      lastSearch: clientSearch,
    });
  };

  render() {
    const {
      clientSearch,
      loading,
      clients,
      showSearch,
      page,
      lastSearch,
      totalPages,
    } = this.state;

    return (
      <Container>
        <TitleContainer>
          <h1>
            <MdPeople />
            Clientes
          </h1>

          <AddButton>
            <Link to="/client/create">Adicionar Cliente</Link>
          </AddButton>
        </TitleContainer>
        <SearchContainer>
          {showSearch ? (
            <div>
              <button type="button" onClick={this.handleDeleteSearch}>
                <MdClose color="#fff" />
              </button>
              Busca: {lastSearch}
            </div>
          ) : (
            <div />
          )}
          <Form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Buscar Clientes"
              value={clientSearch}
              onChange={this.handleInputChange}
            />

            <SubmitButton loading={loading}>
              {loading ? (
                <MdRefresh color="#fff" size={16} />
              ) : (
                <MdSearch color="#fff" size={16} />
              )}
            </SubmitButton>
          </Form>
        </SearchContainer>
        <List>
          {clients.map(client => (
            <li key={client.id}>
              <span>{client.name}</span>
              <div>
                <Link to={`client/${client.id}`}>Editar</Link>
                {/* <button
                  type="button"
                  onClick={() => this.handleDelete(client.id)}
                >
                  Excluir
                </button> */}
              </div>
            </li>
          ))}
        </List>

        {clients.length === 0 ? (
          <h4>Nenhum resultado encontrado.</h4>
        ) : (
          <PaginationContainer>
            <button type="button" disabled={page === 1} onClick={this.prevPage}>
              Anterior
            </button>
            <button
              type="button"
              disabled={page === totalPages}
              onClick={this.nextPage}
            >
              Próximo
            </button>
          </PaginationContainer>
        )}
      </Container>
    );
  }
}
