import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};

let id = 0;
function createData(name, roads, pollution, garbage, waterStagnation, others) {
  id += 1;
  return {name, roads, pollution, garbage,  waterStagnation, others };
}

const data = [
  createData('Adayar', 4, 2, 3, 1, 2),
  createData('Saidapet', 3, 5, 4, 2, 2),
  createData('Tambaram', 4, 2, 3, 1, 2),
  createData('Mylapore', 3, 5, 4, 2, 2),
  createData('Guindy', 4, 2, 3, 1, 2),
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Area in Chennai</TableCell>
            <TableCell align="right">Roads</TableCell>
            <TableCell align="right">Pollution</TableCell>
            <TableCell align="right">Garbage Dumping</TableCell>
            <TableCell align="right">Water Stagnation</TableCell>
            <TableCell align="right">Others</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => (
            <TableRow key={n.id}>
              <TableCell component="th" scope="row">
                {n.name}
              </TableCell>
              <TableCell align="right">{n.roads}</TableCell>
              <TableCell align="right">{n.pollution}</TableCell>
              <TableCell align="right">{n.garbage}</TableCell>
              <TableCell align="right">{n.waterStagnation}</TableCell>
              <TableCell align="right">{n.others}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);