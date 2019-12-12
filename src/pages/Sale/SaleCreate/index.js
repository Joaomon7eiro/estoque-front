import React, { Component } from 'react';

import Container from '../../../components/Container';

import { InputContainer, Form, List } from './styles';

import api from '../../../services/api';

export default class ProductCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientId: '',
      products: [],
      clients: [],
      totalValue: 0,
      selected: [],
    };
  }

  async componentDidMount() {
    const [clients, products] = await Promise.all([
      api.get('/clients'),
      api.get('/products'),
    ]);

    if (clients.data.clients.length > 0) {
      const { id } = clients.data.clients[0];
      this.setState({ clientId: id });
    }

    this.setState({
      clients: clients.data.clients,
      products: products.data.products,
    });
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { clientId, totalValue, selected } = this.state;

    if (selected.length <= 0) {
      return;
    }
    const { history } = this.props;

    const response = await api.post(`/sales`, {
      client_id: clientId,
      value: totalValue,
    });

    const { id, value } = response.data;

    selected.forEach(async prod => {
      await api.post(`/sales/${id}/items`, {
        quantity: prod.quantity,
        product_id: prod.id,
      });
    });
    history.push('/sale');
  };

  handleClientSelect = e => {
    this.setState({ clientId: e.target.value });
  };

  handleProductSelect = e => {
    const product = JSON.parse(e.target.value);
    const { totalValue, selected } = this.state;

    const p = selected.find(sel => sel.id === product.id);

    if (p) return;

    const selectedItem = {
      quantity: 1,
      id: product.id,
      name: product.name,
      price: product.price,
    };

    this.setState({ selected: [...selected, selectedItem] });
    this.setState({ totalValue: totalValue + product.price });
  };

  calculate = () => {
    const { selected } = this.state;

    let total = 0;

    selected.forEach(sel => {
      total += sel.price * sel.quantity;
    });

    this.setState({ totalValue: total });
  };

  handleQuantity = (product, e) => {
    const { selected } = this.state;

    const index = selected.indexOf(product);

    selected[index].quantity = e.target.value;
    selected[index].value = e.target.value * selected[index].price;

    this.calculate();
    this.setState({ selected });
  };

  handleRemoveItem = product => {
    const { selected } = this.state;

    const index = selected.indexOf(product);

    selected.splice(index, 1);

    this.calculate();
    this.setState({ selected });
  };

  render() {
    const { clients, products, selected, totalValue } = this.state;
    return (
      <Container>
        <h1>Nova Venda</h1>
        <h2>Total R${totalValue}</h2>

        <Form onSubmit={this.handleSubmit}>
          <InputContainer>
            <span>Cliente</span>
            <select name="clients" onChange={this.handleClientSelect}>
              {clients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </InputContainer>

          <InputContainer>
            <span>Selecionar Produto</span>
            <select name="products" onChange={this.handleProductSelect}>
              <option disabled selected value>
                Selecione um produto
              </option>
              {products.map(product => (
                <option key={product.id} value={JSON.stringify(product)}>
                  {product.name}
                </option>
              ))}
            </select>
          </InputContainer>

          <List>
            {selected.map(select => (
              <li key={select.price}>
                <span>{select.name}</span>
                <span>R$ {select.price}</span>
                <div>
                  <span>Quantidade</span>
                  <input
                    type="number"
                    defaultValue="1"
                    min="1"
                    onChange={e => this.handleQuantity(select, e)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => this.handleRemoveItem(select)}
                >
                  Remover
                </button>
              </li>
            ))}
          </List>

          <button type="submit">Salvar</button>
        </Form>
      </Container>
    );
  }
}
