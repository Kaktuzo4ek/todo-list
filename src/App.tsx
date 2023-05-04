import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';

import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';

const App: React.FC = () => (
  <div className='App'>
    <Header />
    <Container maxWidth='lg'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Container>
  </div>
);

export default App;
