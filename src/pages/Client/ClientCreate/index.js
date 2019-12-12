import React, { Component } from 'react';

import Container from '../../../components/Container';

import { InputContainer, Form } from './styles';

import api from '../../../services/api';

export default class ClientCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phoneNumber: '',
      email: '',
    };
  }

  handleSubmit = async e => {
    e.preventDefault();

    const { name, phoneNumber, email } = this.state;
    const { history } = this.props;

    await api.post(`/clients`, {
      name,
      phone_number: phoneNumber,
      email,
    });

    history.push('/client');
  };

  handleNameInput = e => {
    this.setState({ name: e.target.value });
  };

  handlePhoneInput = e => {
    this.setState({ phoneNumber: e.target.value });
  };

  handleEmailInput = e => {
    this.setState({ email: e.target.value });
  };

  render() {
    const { name, phoneNumber, email } = this.state;

    return (
      <Container>
        <h2>Novo Cliente</h2>

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

          <InputContainer>
            <span>Email</span>
            <input type="text" value={email} onChange={this.handleEmailInput} />
          </InputContainer>

          <button type="submit">Salvar</button>
        </Form>
      </Container>
    );
  }
}
