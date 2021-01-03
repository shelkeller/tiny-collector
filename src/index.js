import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/hexagon.css';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Helmet} from "react-helmet";


ReactDOM.render(
  // <React.StrictMode>
    <>
    <Helmet>
      <title>{'Tiny Collector'}</title>
    </Helmet>
    <App />
    </>,
  // </React.StrictMode>,
  document.getElementById('root')
);
