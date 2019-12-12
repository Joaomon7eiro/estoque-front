import React from 'react';

import {
  MdPeople,
  MdMonetizationOn,
  MdLocalShipping,
  MdShoppingCart,
} from 'react-icons/md';

import { Container } from './styles';

import NavItem from '../NavItem';

const Navbar = () => {
  return (
    <nav>
      <Container>
        <NavItem
          exact
          name="Produtos"
          path="/"
          icon={<MdShoppingCart size={24} />}
        />
        <NavItem
          name="Fornecedores"
          path="/provider"
          icon={<MdLocalShipping size={24} />}
        />
        <NavItem name="Clientes" path="/client" icon={<MdPeople size={24} />} />
        <NavItem
          name="Vendas"
          path="/sale"
          icon={<MdMonetizationOn size={24} />}
        />
      </Container>
    </nav>
  );
};

export default Navbar;
