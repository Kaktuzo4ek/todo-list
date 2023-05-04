import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import PushPinIcon from '@mui/icons-material/PushPin';

import styles from './basicTable.module.scss';

const rows = [
  { data: '04.05.2024 17:56', name: 'Новий таск' },
  { data: '04.05.2024 17:56', name: 'Новий таск' },
  { data: '04.05.2024 17:56', name: 'Новий таск' },
];

const BasicTable: React.FC = () => (
  <TableContainer className={styles.table} component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
      <TableHead>
        <TableRow>
          <TableCell>Дата створення</TableCell>
          <TableCell align='left'>Статус</TableCell>
          <TableCell align='left'>Назва</TableCell>
          <TableCell align='left'>Дії</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.data}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component='th' scope='row' align='left'>
              {row.data}
            </TableCell>
            <TableCell align='left'>
              <Checkbox />
            </TableCell>
            <TableCell align='left'>{row.name}</TableCell>
            <TableCell align='left'>
              <PushPinIcon />
              <DeleteIcon />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default BasicTable;
