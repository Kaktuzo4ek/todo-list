import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { useDispatch } from 'react-redux';
import styles from './header.module.scss';
import { RootState, useAppSelector } from '../../redux/store';
import { logout, selectIsAuth } from '../../redux/auth';

export const Header: React.FC = () => {
  const isAuth = useAppSelector((state: RootState) => selectIsAuth(state.auth));
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const onClickLogout = (): void => {
    if (window.confirm('Ви впевнені, що хочете вийти?')) {
      dispatch(logout());
      window.localStorage.removeItem('user');
    }
  };

  return (
    <header className={styles.root}>
      <Container maxWidth='lg'>
        <div className={styles.inner}>
          <Link className={styles.logo} to='/'>
            <div>TODO LIST</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <div className={styles.flexBox}>
                <span>{user.name}</span>
                <Button
                  onClick={onClickLogout}
                  variant='contained'
                  color='error'
                >
                  Вийти
                </Button>
              </div>
            ) : (
              <Link to='/login'>
                <Button variant='outlined'>Увійти</Button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
