import React from 'react';

import { Link } from 'react-router-dom';
import { Container } from './styles';

import NavBar from '../Navbar';

export default function Header() {
  return (
    <>
      <Container>
        <Link to="/">SysEstoque</Link>
        {/* <p to="/">Bem vindo {userName}!</p> */}
      </Container>
      <NavBar />
    </>
  );
}
