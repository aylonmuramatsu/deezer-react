import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.css';
import './index.css';

import Routes from './main/router';

ReactDOM.render(
  <Routes/>,
  document.getElementById('root')
);
