import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

function TableHeadings(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const headCells = [
    { id: 'hospital', label: 'Hospital Name' },
    { id: 'item', label: 'Item' },
    { id: 'quantity', label: 'Quantity' },
    { id: 'quantityFulfilled', label: 'Fulfilled' },
    { id: 'dateAdded', label: 'Date Added' },
  ];

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'desc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell />
      </TableRow>
    </TableHead>
  );
}

class ReqTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'desc',
      orderBy: 'dateAdded',
    };
  }

  handleRequestSort = (event, property) => {
    const isDesc = this.state.orderBy === property && this.state.order === 'desc';
    if (isDesc) {
      this.setState({
        order: 'asc',
        orderBy: property,
      });
    }
    else {
      this.setState({
        order: 'desc',
        orderBy: property,
      });
    }
  };

  descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  };

  getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => this.descendingComparator(a, b, orderBy)
      : (a, b) => -this.descendingComparator(a, b, orderBy);
  };

  stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => {
      return [ el, index ];
    });
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]); //this.getComparator(order, orderBy)(a[0],b[0]), of which a[0], b[0] (the elements) are passed to descendingComparator function
      if (order !== 0) return order;
      return a[1] - b[1]; //using the index of stabilizedThis to sort if order === 0
    });
    return stabilizedThis.map((el) => el[0]);
  };

  handleClick = (id) => (event) => {
    this.props.onRequestChoice(event, id);
    this.props.history.push(`/donate/${id}`);
  };

  render() {
    const { requests } = this.props;

    const sortedArray = this.stableSort(requests, this.getComparator(this.state.order, this.state.orderBy));
    const tableRows = sortedArray.map(({ id, hospital, dateAdded, item, quantity, quantityFulfilled }) => (
      <TableRow key={id}>
        <TableCell component='th' scope='row'>
          {hospital}
        </TableCell>
        <TableCell>{item}</TableCell>
        <TableCell align='center'>{quantity}</TableCell>
        <TableCell align='center'>
          {quantityFulfilled}/{quantity}
        </TableCell>
        <TableCell>{dateAdded.toDateString()}</TableCell>
        <TableCell>
          <Button variant='outlined' onClick={this.handleClick(id)}>
            Donate Now
          </Button>
        </TableCell>
      </TableRow>
    ));

    return (
      <React.Fragment>
        <TableContainer component={Paper} elevation='3' className='tableContainer-padding'>
          <Table aria-label='request board'>
            <TableHeadings
              order={this.state.order}
              orderBy={this.state.orderBy}
              onRequestSort={this.handleRequestSort}
            />
            <TableBody>{tableRows}</TableBody>
          </Table>
        </TableContainer>
      </React.Fragment>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { requests, hospitals } = this.props;

    const reqsWithHospName = requests.map(
      ({ id, hospital_ID, dateAdded, item, quantity, quantityFulfilled, status }) => {
        const hospital = hospitals.find((hospital) => hospital.id === hospital_ID);
        return {
          id,
          hospital: hospital.name,
          dateAdded,
          item,
          quantity,
          quantityFulfilled,
          status,
        };
      }
    );

    return (
      <React.Fragment>
        <ReqTable
          requests={reqsWithHospName}
          onRequestChoice={this.props.onRequestChoice}
          history={this.props.history}
        />
      </React.Fragment>
    );
  }
}

export default Board;
