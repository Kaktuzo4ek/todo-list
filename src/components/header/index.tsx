import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import styles from './header.module.scss';

export const Header: React.FC = () => (
  <header className={styles.root}>
    <Container maxWidth='lg'>
      <div className={styles.inner}>
        <Link className={styles.logo} to='/'>
          <div>TODO LIST</div>
        </Link>
        <div className={styles.buttons}>
          <Link to='/login'>
            <Button variant='outlined'>Увійти</Button>
          </Link>
          <Link to='/register'>
            <Button variant='contained'>Створити аккаунт</Button>
          </Link>
        </div>
      </div>
    </Container>
  </header>
);

export default Header;
