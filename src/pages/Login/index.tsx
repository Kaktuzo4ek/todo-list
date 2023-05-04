import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';

import styles from './login.module.scss';

const Login: React.FC = () => {
  const {
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant='h5'>
        Вхід в аккаунт
      </Typography>
      <form>
        <TextField
          className={styles.field}
          label='E-Mail'
          type='email'
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          fullWidth
        />
        <TextField
          className={styles.field}
          label='Пароль'
          type='password'
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
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
