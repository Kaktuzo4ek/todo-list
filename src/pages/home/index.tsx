import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import styles from './home.module.scss';
import BasicTable from '../../components/Table';

const Home: React.FC = () => (
  <div>
    <div className={styles.flexBox}>
      <TextField
        className={styles.inputField}
        id='outlined-basic'
        label='Введіть назву справи'
        variant='outlined'
        size='small'
      />
      <Button className={styles.createBtn} variant='contained'>
        Створити
      </Button>
    </div>
    <BasicTable />
  </div>
);

export default Home;
