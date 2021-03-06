import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
//this will bring in Apollo
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

import Specifications from './pages/Specifications';
import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';

import Profile from './components/Profile';
import Nav from './components/Nav';
import Signup from './pages/Signup';
import Single from './pages/Single';
import Quote from './pages/Quote';

import { StoreProvider  } from './utils/GlobalState';
import PurchasedHistory from './pages/PurchasedHistory';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
  
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
    <div className='flex-column justify-flex-start min-100-vh'>
      <div className='container'>
      <StoreProvider>
      <Nav />
      <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/quote" component={Quote} />
            <Route exact path="/profile/:username?" component={Profile} />
            <Route exact path="/comment/:id" component={Specifications} />
            <Route exact path="/purchasedHistory" component={PurchasedHistory} />
            <Route exact path="/products/:id" component={Specifications} />
            <Route exact path="/profile/:username?" component={Profile} />
            <Route exact path="/comment/:id" component={Single} />


            <Route component={NoMatch} />
      </Switch>
    </StoreProvider>
    </div>
      <Footer />
    </div>
    </Router>
    </ApolloProvider>
  );
}

export default App;
