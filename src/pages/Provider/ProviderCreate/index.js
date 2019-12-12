import React, { Component } from 'react';

import Container from '../../../components/Container';

import { InputContainer, Form } from './styles';

import api from '../../../services/api';

export default class ProviderCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phoneNumber: '',
    };
  }

  handleSubmit = async e => {
    e.preventDefault();

    const { name, phoneNumber } = this.state;
    const { history } = this.props;

    await api.post(`/providers`, {
      name,
      phone_number: phoneNumber,
    });

    history.push('/provider');
  };

  handleNameInput = e => {
    this.setState({ name: e.target.value });
  };

  handlePhoneInput = e => {
    this.setState({ phoneNumber: e.target.value });
  };

  render() {
    const { name, phoneNumber } = this.state;

    return (
      <Container>
        <h2>Novo Fornecedor</h2>

        <Form onSubmit={this.handleSubmit}>
          <InputContainer>
            <span>Nome</span>
            <input type="text" value={name} onChange={this.handleNameInput} />
          </InputContainer>

          <InputContainer>
            <span>Telefone</span>
            <input
              type="text"
              value={phoneNumber}
              onChange={this.handlePhoneInput}
            />
          </InputContainer>

          <button type="submit">Salvar</button>
        </Form>
      </Container>
    );
  }
}
