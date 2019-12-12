import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { MdShoppingCart, MdSearch, MdRefresh, MdClose } from 'react-icons/md';

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

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productSearch: '',
      products: [],
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
    const response = await api.get(`/products`, {
      params: {
        page,
      },
    });

    this.setState({ totalPages: response.data.totalPages });

    const products = response.data.products.map(product => {
      return {
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
      };
    });

    this.setState({
      products,
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
    this.setState({ productSearch: e.target.value });
  };

  handleDeleteSearch = async () => {
    await this.loadProducts();

    this.setState({
      lastSearch: '',
      showSearch: false,
    });
  };

  handleDelete = async id => {
    await api.delete(`/products/${id}`);
    this.loadProducts();
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { productSearch } = this.state;

    if (productSearch.length === 0) return;

    this.setState({ loading: true });

    const response = await api.get(`/products`, {
      params: {
        query: productSearch,
      },
    });

    this.setState({ totalPages: response.data.totalPages });

    const products = response.data.products.map(product => {
      return {
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
      };
    });

    this.setState({
      products,
      loading: false,
      showSearch: true,
      productSearch: '',
      lastSearch: productSearch,
    });
  };

  render() {
    const {
      productSearch,
      loading,
      products,
      showSearch,
      page,
      lastSearch,
      totalPages,
    } = this.state;

    return (
      <Container>
        <TitleContainer>
          <h1>
            <MdShoppingCart />
            Produtos
          </h1>

          <AddButton>
            <Link to="/product/create">Adicionar Produto</Link>
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
              placeholder="Buscar Produtos"
              value={productSearch}
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
          {products.map(product => (
            <li key={product.id}>
              <span>{product.name}</span>
              <span>{product.quantity}</span>
              <div>
                <Link to={`product/${product.id}`}>Editar</Link>
                {/* <button
                  type="button"
                  onClick={() => this.handleDelete(product.id)}
                >
                  Excluir
                </button> */}
              </div>
            </li>
          ))}
        </List>

        {products.length === 0 ? (
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
