/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';

import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';

const App: React.FC = () => (
  <Provider store={store}>
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  </Provider>
);

export default App;
