/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Paper from '@mui/material/Paper';

import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';

const App: React.FC = () => (
  <Paper>
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  </Paper>
);

export default App;
