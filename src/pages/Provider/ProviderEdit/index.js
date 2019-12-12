import React, { Component } from 'react';

import { MdRefresh } from 'react-icons/md';

import PropTypes from 'prop-types';

import api from '../../../services/api';

import { Loading, InputContainer, Form } from './styles';

import Container from '../../../components/Container';

export default class ProviderEdit extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        providerId: PropTypes.number,
      }),
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      provider: {},
      loading: true,
      name: '',
      phoneNumber: '',
    };
  }

  async componentDidMount() {
    const { match } = this.props;

    const { providerId } = match.params;

    const provider = await api.get(`/providers/${providerId}`);

    this.setState({
      provider: provider.data,
      loading: false,
      name: provider.data.name,
      phoneNumber: provider.data.phoneNumber,
    });
  }

  handleSubmit = async e => {
    e.preventDefault();

    const { provider, name, phoneNumber } = this.state;
    const { history } = this.props;

    await api.put(`/providers/${provider.id}`, {
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
    const { loading, name, phoneNumber } = this.state;

    if (loading) {
      return (
        <Loading>
          <MdRefresh color="#ddd" size={24} />
        </Loading>
      );
    }

    return (
      <Container>
        <h2>Editar Fornecedor</h2>
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
