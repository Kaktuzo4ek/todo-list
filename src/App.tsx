/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Paper from '@mui/material/Paper';

import Header from './components/header';

import Home from './pages/home';

import Login from './pages/login';

const App: React.FC = () => (
  <Paper elevation={0}>
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
