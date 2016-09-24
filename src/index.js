import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRoute, Route, hashHistory} from 'react-router';

import App from './containers/app';
import About from './components/about';
import ProductsManager from './components/productsManager';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={ProductsManager} />
      <Route path="about" component={About} />
    </Route>
  </Router>
), document.getElementById('root'));
