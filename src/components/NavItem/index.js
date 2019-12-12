import React from 'react';

import { NavLink } from 'react-router-dom';

import { Container, Item } from './styles';

const NavItem = ({ name, icon, path, exact }) => {
  return (
    <Container>
      <NavLink
        exact={exact}
        to={path}
        activeStyle={{
          fontWeight: 'bold',
          color: '#4577e2',
        }}
      >
        <Item>
          {icon}
          <p>{name}</p>
        </Item>
      </NavLink>
    </Container>
  );
};

export default NavItem;
