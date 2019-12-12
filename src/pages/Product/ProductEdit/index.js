import React, { Component } from 'react';

import { MdRefresh } from 'react-icons/md';

import PropTypes from 'prop-types';

import api from '../../../services/api';

import { Loading, InputContainer, Form } from './styles';

import Container from '../../../components/Container';

export default class ProductEdit extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        productId: PropTypes.number,
      }),
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      product: {},
      loading: true,
      name: '',
      price: '',
      quantity: '',
    };
  }

  async componentDidMount() {
    const { match } = this.props;

    const { productId } = match.params;

    const product = await api.get(`/products/${productId}`);

    this.setState({
      product: product.data,
      loading: false,
      name: product.data.name,
      quantity: product.data.quantity,
      price: product.data.price,
    });
  }

  handleSubmit = async e => {
    e.preventDefault();

    const { product, name, quantity, price } = this.state;
    const { history } = this.props;

    await api.put(`/products/${product.id}`, {
      name,
      quantity,
      price,
    });

    history.push('/');
  };

  handleNameInput = e => {
    this.setState({ name: e.target.value });
  };

  handleQuantityInput = e => {
    this.setState({ quantity: e.target.value });
  };

  handlePriceInput = e => {
    this.setState({ price: e.target.value });
  };

  render() {
    const { loading, name, price, quantity } = this.state;

    if (loading) {
      return (
        <Loading>
          <MdRefresh color="#ddd" size={24} />
        </Loading>
      );
    }

    return (
      <Container>
        <h2>Editar Produto</h2>
        <Form onSubmit={this.handleSubmit}>
          <InputContainer>
            <span>Nome</span>
            <input type="text" value={name} onChange={this.handleNameInput} />
          </InputContainer>

          <InputContainer>
            <span>Quantidade</span>
            <input
              type="text"
              value={quantity}
              onChange={this.handleQuantityInput}
            />
          </InputContainer>

          <InputContainer>
            <span>Valor</span>
            <input type="text" value={price} onChange={this.handlePriceInput} />
          </InputContainer>

          <button type="submit">Salvar</button>
        </Form>
      </Container>
    );
  }
}
