import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Provider from './pages/Provider';
import ProviderEdit from './pages/Provider/ProviderEdit';
import ProviderCreate from './pages/Provider/ProviderCreate';

import Product from './pages/Product';
import ProductEdit from './pages/Product/ProductEdit';
import ProductCreate from './pages/Product/ProductCreate';

import Client from './pages/Client';
import ClientEdit from './pages/Client/ClientEdit';
import ClientCreate from './pages/Client/ClientCreate';

import Sale from './pages/Sale';
import SaleCreate from './pages/Sale/SaleCreate';

import Header from './components/Header';

export default function Routes() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Product} />
        <Route path="/provider/create" component={ProviderCreate} />
        <Route path="/provider/:providerId" component={ProviderEdit} />
        <Route path="/provider" component={Provider} />

        <Route path="/product/create" component={ProductCreate} />
        <Route path="/product/:productId" component={ProductEdit} />
        {/* <Route path="/product" component={Product} /> */}

        <Route path="/client" exact component={Client} />
        <Route path="/client/create" component={ClientCreate} />
        <Route path="/client/:clientId" component={ClientEdit} />

        <Route path="/sale" exact component={Sale} />
        <Route path="/sale/create" component={SaleCreate} />
      </Switch>
    </BrowserRouter>
  );
}
