import React from 'react';
import ReactDOM from 'react-dom';
import App from '../containers/App';

it('renders App and displays correct Title', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App routes={['root', {component: {name:'about'}}]} />, div);
});
