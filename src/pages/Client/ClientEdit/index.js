import React, { Component } from 'react';

import { MdRefresh } from 'react-icons/md';

import PropTypes from 'prop-types';

import api from '../../../services/api';

import { Loading, InputContainer, Form } from './styles';

import Container from '../../../components/Container';

export default class ClientEdit extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        clientId: PropTypes.number,
      }),
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      client: {},
      loading: true,
      name: '',
      phoneNumber: '',
      email: '',
    };
  }

  async componentDidMount() {
    const { match } = this.props;

    const { clientId } = match.params;

    const client = await api.get(`/clients/${clientId}`);

    this.setState({
      client: client.data,
      loading: false,
      name: client.data.name,
      phoneNumber: client.data.phoneNumber,
      email: client.data.email,
    });
  }

  handleSubmit = async e => {
    e.preventDefault();

    const { client, name, phoneNumber, email } = this.state;
    const { history } = this.props;

    await api.put(`/clients/${client.id}`, {
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
    const { loading, name, phoneNumber, email } = this.state;

    if (loading) {
      return (
        <Loading>
          <MdRefresh color="#ddd" size={24} />
        </Loading>
      );
    }

    return (
      <Container>
        <h2>Editar Cliente</h2>
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
