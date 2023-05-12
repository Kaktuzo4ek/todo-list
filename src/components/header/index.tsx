import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { useDispatch } from 'react-redux';
import styles from './header.module.scss';
import { RootState, useAppSelector } from '../../redux/store';
import { logout, selectIsAuth } from '../../redux/auth';
import { changeThemeToggle } from '../../redux/theme';

export const Header: React.FC = () => {
  const isAuth = useAppSelector((state: RootState) => selectIsAuth(state.auth));
  const darkTheme = useAppSelector((state: RootState) => state.theme.darkTheme);
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const onClickLogout = (): void => {
    if (window.confirm('Ви впевнені, що хочете вийти?')) {
      dispatch(logout());
      window.localStorage.removeItem('user');
    }
  };

  return (
    <Paper className={styles.root} elevation={0}>
      <Container maxWidth='lg'>
        <div className={styles.inner}>
          <Link className={styles.logo} to='/'>
            <div>TODO LIST</div>
          </Link>
          <div className={styles.buttons}>
            <div className={styles.flexBox}>
              <IconButton
                sx={{ ml: 1 }}
                onClick={() => dispatch(changeThemeToggle())}
                color='inherit'
              >
                {darkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
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
        </div>
      </Container>
    </Paper>
  );
};

export default Header;
