import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import styles from './home.module.scss';
import BasicTable from '../../components/Table';
import Widget from '../../components/Widget';

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
    <div className={styles.flexBox}>
      <div className={styles.tasks}>
        <h1>Список справ</h1>
        <BasicTable />
        <h1>Завершені справи</h1>
        <BasicTable />
      </div>
      <div className={styles.widgets}>
        <h1>Віджети</h1>
        <Paper elevation={3} className={styles.widget}>
          <Widget />
        </Paper>
        <Paper elevation={3} className={styles.widget}>
          <Widget />
        </Paper>
        <Paper elevation={3} className={styles.widget}>
          <Widget />
        </Paper>
      </div>
    </div>
  </div>
);

export default Home;
