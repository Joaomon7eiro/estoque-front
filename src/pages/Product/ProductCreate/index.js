import React, { Component } from 'react';

import Container from '../../../components/Container';

import { InputContainer, Form } from './styles';

import api from '../../../services/api';

export default class ProductCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      quantity: '',
      price: '',
      providerId: '',
      providers: [],
    };
  }

  async componentDidMount() {
    const response = await api.get('/providers');
    if (response.data.providers.length > 0) {
      const { id } = response.data.providers[0];
      this.setState({ providerId: id });
    }
    this.setState({ providers: response.data.providers });
  }

  handleSubmit = async e => {
    e.preventDefault();

    const { name, quantity, price, providerId } = this.state;
    const { history } = this.props;

    await api.post(`/products`, {
      name,
      price,
      quantity,
      provider_id: providerId,
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

  handleProviderSelect = e => {
    this.setState({ providerId: e.target.value });
  };

  render() {
    const { name, price, quantity, providers } = this.state;

    return (
      <Container>
        <h2>Novo Produto</h2>

        <Form onSubmit={this.handleSubmit}>
          <InputContainer>
            <span>Nome</span>
            <input type="text" value={name} onChange={this.handleNameInput} />
          </InputContainer>

          <InputContainer>
            <span>Preço</span>
            <input type="text" value={price} onChange={this.handlePriceInput} />
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
            <span>Fornecedor</span>
            <select name="providers" onChange={this.handleProviderSelect}>
              {providers.map(provider => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
          </InputContainer>

          <button type="submit">Salvar</button>
        </Form>
      </Container>
    );
  }
}
