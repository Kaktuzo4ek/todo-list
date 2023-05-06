/* eslint-disable operator-linebreak */
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import Paper from '@mui/material/Paper';

import styles from './basicTable.module.scss';

import { RootState, useAppSelector } from '../../redux/store';
import { Task } from '../../redux/tasks';

interface BasicTableProps {
  onRemoveTask: (task: Task) => void;
  onPinTask: (task: Task) => void;
  onUnpinTask: (task: Task) => void;
}

const BasicTable: React.FC<BasicTableProps> = ({
  onRemoveTask,
  onPinTask,
  onUnpinTask,
}) => {
  const tasks = useAppSelector((state: RootState) => state.tasks.tasks);

  return (
    <Paper elevation={3}>
      <TableContainer className={styles.table}>
        <Table sx={{ width: 800 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 120 }}>Дата створення</TableCell>
              <TableCell sx={{ width: 50 }} align='left'>
                Статус
              </TableCell>
              <TableCell sx={{ width: 300 }} align='left'>
                Назва
              </TableCell>
              <TableCell sx={{ width: 40 }} align='left'>
                Дії
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.length > 0 &&
              tasks.map((row) => (
                <TableRow
                  key={row.date}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row' align='left'>
                    {row.date}
                  </TableCell>
                  <TableCell align='left'>
                    <Checkbox />
                  </TableCell>
                  <TableCell align='left'>{row.name}</TableCell>
                  <TableCell align='left'>
                    {row.isPinned ? (
                      <PushPinIcon
                        onClick={() => onUnpinTask(row)}
                        className={styles.icons}
                      />
                    ) : (
                      <PushPinOutlinedIcon
                        onClick={() => onPinTask(row)}
                        className={styles.icons}
                      />
                    )}
                    <DeleteIcon
                      onClick={() => onRemoveTask(row)}
                      className={styles.icons}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default BasicTable;
