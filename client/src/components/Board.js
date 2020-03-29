import React from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class Board extends React.Component {
  render() {
    const { requests, hospitals } = this.props;

    const reqsByDate = requests
      .map(({ id, hospital_ID, dateAdded, item, quantity, priority, quantityFulfilled, status }) => {
        const hospital = hospitals.find((hospital) => hospital.id === hospital_ID);
        return {
          id,
          hospital: hospital.name,
          dateAdded,
          item,
          quantity,
          priority,
          quantityFulfilled,
          status,
        };
      })
      .sort((a, b) => {
        return b.dateAdded - a.dateAdded;
      });

    const tableRows = reqsByDate.map(({ id, hospital, item, quantity, priority, quantityFulfilled }) => (
      <TableRow key={id} className={`${priority}Priority`}>
        <TableCell component='th' scope='row'>
          {hospital}
        </TableCell>
        <TableCell>{item}</TableCell>
        <TableCell align='center'>{quantity}</TableCell>
        <TableCell align='center'>
          {quantityFulfilled}/{quantity}
        </TableCell>
        <TableCell align='center'>{priority}</TableCell>
        <TableCell>
          <Button variant='outlined' component={Link} to='/donate'>
            Donate Now
          </Button>
        </TableCell>
      </TableRow>
    ));

    return (
      <React.Fragment>
        <div>filter bar</div>
        <div>
          <TableContainer component={Paper}>
            <Table aria-label='request board'>
              <TableHead>
                <TableRow>
                  <TableCell>Hospital Name</TableCell>
                  <TableCell>Item</TableCell>
                  <TableCell align='center'>Quantity Needed</TableCell>
                  <TableCell align='center'>Quantity Fulfilled</TableCell>
                  <TableCell align='center'>Priority</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>{tableRows}</TableBody>
            </Table>
          </TableContainer>
        </div>
      </React.Fragment>
    );
  }
}

export default Board;
