/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Provider } from 'react-redux';

import { store } from './redux/store';

import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';

const App: React.FC = () => (
  <Provider store={store}>
    <div className='App'>
      <Header />
      <Container maxWidth='lg'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Container>
    </div>
  </Provider>
);

export default App;
