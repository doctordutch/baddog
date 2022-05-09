import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
//import Productlist from './components/Productlist';
//this will bring in Apollo
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleProduct from './pages/SingleProduct';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Quote from './pages/Quote'

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
    <div className='flex-column justify-flex-start min-100-vh'>
      <Header />
      <div className='container'>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/quote" component={Quote} />
            <Route exact path="/profile/:username?" component={Profile} />
            <Route exact path="/product/:id" component={SingleProduct} />
            <Route component={NoMatch} />
            
            </Switch>
      </div>
      <Footer />
    </div>
    </Router>
    </ApolloProvider>
  );
}

export default App;
