import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { MdMonetizationOn } from 'react-icons/md';

import { List, TitleContainer, AddButton, PaginationContainer } from './styles';

import Container from '../../components/Container';

import api from '../../services/api';

export default class Sale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: [],
      page: 1,
      totalPages: 1,
    };
  }

  async componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/sales`, {
      params: {
        page,
      },
    });

    this.setState({ totalPages: response.data.totalPages });

    const sales = response.data.sales.map(sale => {
      return {
        id: sale.id,
        clientName: sale.client.name,
        value: sale.value,
      };
    });

    this.setState({
      sales,
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

  render() {
    const { sales, page, totalPages } = this.state;

    return (
      <Container>
        <TitleContainer>
          <h1>
            <MdMonetizationOn />
            Vendas
          </h1>

          <AddButton>
            <Link to="/sale/create">Nova Venda</Link>
          </AddButton>
        </TitleContainer>

        <List>
          {sales.map(sale => (
            <li key={sale.id}>
              <span>{sale.clientName}</span>
              <span>R$ {sale.value}</span>
              <div>
                {/* <Link to={`sale/${sale.id}`}>Detalhes</Link> */}
                {/* <button
                  type="button"
                  onClick={() => this.handleDelete(sale.id)}
                >
                  Excluir
                </button> */}
              </div>
            </li>
          ))}
        </List>

        {sales.length === 0 ? (
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
