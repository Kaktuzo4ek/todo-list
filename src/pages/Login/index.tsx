/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RootState, useAppSelector } from '../../redux/store';

import styles from './login.module.scss';
import { User, login, selectIsAuth } from '../../redux/auth';

const Login: React.FC = () => {
  const isAuth = useAppSelector((state: RootState) => selectIsAuth(state.auth));
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: User): Promise<void> => {
    const data = await dispatch(login(values));
    if (!data.payload) {
      alert('Не вдалося авторизуватися');
    }
    if ('name' in data.payload) {
      window.localStorage.setItem('user', JSON.stringify(data.payload));
    }
  };

  if (isAuth) {
    return <Navigate to='/' />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant='h5'>
        Вхід в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label='E-Mail'
          type='text'
          error={Boolean(errors.name?.message)}
          helperText={errors.name?.message}
          {...register('name', { required: "Вкажіть ім'я" })}
          fullWidth
        />
        <Button type='submit' size='large' variant='contained' fullWidth>
          Увійти
        </Button>
      </form>
    </Paper>
  );
};

export default Login;
