import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

function ConfirmPage(props) {
  const goToReqBoard = (event) => {
    props.history.push('/');
  };

  return (
    <Paper>
      <Typography variant='h5' gutterBottom>
        Thank you for your donation!
      </Typography>
      <Typography variant='subtitle1'>We have emailed you a copy of the details for your record.</Typography>
      <div className='button--display'>
        <Button variant='contained' color='primary' onClick={goToReqBoard}>
          Back to Request Board
        </Button>
      </div>
    </Paper>
  );
}

export default ConfirmPage;
