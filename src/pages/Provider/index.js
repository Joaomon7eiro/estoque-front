import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { MdLocalShipping, MdSearch, MdRefresh, MdClose } from 'react-icons/md';

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

export default class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providerSearch: '',
      providers: [],
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
    const response = await api.get(`/providers`, {
      params: {
        page,
      },
    });

    this.setState({ totalPages: response.data.totalPages });

    const providers = response.data.providers.map(provider => {
      return {
        id: provider.id,
        name: provider.name,
      };
    });

    this.setState({
      providers,
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
    this.setState({ providerSearch: e.target.value });
  };

  handleDeleteSearch = async () => {
    await this.loadProducts();

    this.setState({
      lastSearch: '',
      showSearch: false,
    });
  };

  handleDelete = async id => {
    await api.delete(`/providers/${id}`);
    this.loadProducts();
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { providerSearch } = this.state;

    if (providerSearch.length === 0) return;

    this.setState({ loading: true });

    const response = await api.get(`/providers`, {
      params: {
        query: providerSearch,
      },
    });

    this.setState({ totalPages: response.data.totalPages });

    const providersNames = response.data.providers.map(provider => {
      return {
        id: provider.id,
        name: provider.name,
      };
    });

    this.setState({
      providers: providersNames,
      loading: false,
      showSearch: true,
      providerSearch: '',
      lastSearch: providerSearch,
    });
  };

  render() {
    const {
      providerSearch,
      loading,
      providers,
      showSearch,
      page,
      lastSearch,
      totalPages,
    } = this.state;

    return (
      <Container>
        <TitleContainer>
          <h1>
            <MdLocalShipping />
            Fornecedores
          </h1>

          <AddButton>
            <Link to="/provider/create">Adicionar Fornecedor</Link>
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
              placeholder="Buscar Fornecedores"
              value={providerSearch}
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
          {providers.map(provider => (
            <li key={provider.id}>
              <span>{provider.name}</span>
              <div>
                <Link to={`provider/${provider.id}`}>Editar</Link>
                {/* <button
                  type="button"
                  onClick={() => this.handleDelete(provider.id)}
                >
                  Excluir
                </button> */}
              </div>
            </li>
          ))}
        </List>

        {providers.length === 0 ? (
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
