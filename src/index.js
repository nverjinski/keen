import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Parent from './pages/parent';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Parent />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
