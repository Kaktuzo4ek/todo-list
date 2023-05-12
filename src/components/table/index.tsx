/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable function-paren-newline */
/* eslint-disable react-hooks/exhaustive-deps */
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
import classNames from 'classnames';

import styles from './basicTable.module.scss';

import { RootState, useAppSelector } from '../../redux/store';
import { Task } from '../../redux/tasks';

interface BasicTableProps {
  onRemoveTask: (task: Task) => void;
  onPinTask: (task: Task) => void;
  onUnpinTask: (task: Task) => void;
  onCompleteTaskToggle: (task: Task) => void;
  completedTask: boolean;
}

const BasicTable: React.FC<BasicTableProps> = ({
  onRemoveTask,
  onPinTask,
  onUnpinTask,
  onCompleteTaskToggle,
  completedTask,
}) => {
  const tasks = useAppSelector((state: RootState) =>
    completedTask
      ? state.tasks.tasks.filter((item) => item.isCompleted)
      : state.tasks.tasks.filter((item) => !item.isCompleted),
  );

  return (
    <TableContainer className={styles.table} component={Paper} elevation={3}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
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
                  {row.isCompleted ? (
                    <Checkbox
                      checked
                      onClick={() => onCompleteTaskToggle(row)}
                    />
                  ) : (
                    <Checkbox onClick={() => onCompleteTaskToggle(row)} />
                  )}
                </TableCell>
                <TableCell
                  align='left'
                  className={classNames({
                    [styles.crossedText]: row.isCompleted,
                  })}
                >
                  {row.name}
                </TableCell>
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
  );
};

export default BasicTable;
