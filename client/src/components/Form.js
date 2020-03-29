import React from 'react';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

function DonationDets(props) {
  const { hospInfo, reqInfo } = props;
  return (
    <div>
      <Typography variant='h5'>Donation Details</Typography>
      <div>
        <Typography variant='h6'>Item Information</Typography>
        <TextField label='Type' type='string' value={reqInfo.item} fullWidth />
        <TextField
          name='quantity'
          label='Quantity'
          type='number'
          value={reqInfo.quantity}
          fullWidth
          autoFocus
          onChange={(event) => props.updateChanges(event, 'reqInfo')}
        />
      </div>
      <div>
        <Typography variant='h6'>Hospital Information</Typography>
        <TextField label='Name' type='string' value={hospInfo.name} fullWidth />
        <TextField label='Address' type='string' value={hospInfo.address} fullWidth />
        <TextField label='Contact Person' type='string' value={hospInfo.contact} fullWidth />
        <TextField label='Email' type='email' value={hospInfo.email} fullWidth />
      </div>
    </div>
  );
}

function DonorInfo(props) {
  const { donorInfo } = props;
  return (
    <div>
      <Typography variant='h5'>Donor Information</Typography>
      <div>
        <TextField
          name='name'
          label='Name'
          type='string'
          value={donorInfo.name}
          fullWidth
          autoFocus
          onChange={(event) => props.updateChanges(event, 'donorInfo')}
        />
        <TextField
          name='company'
          label='Company'
          type='string'
          value={donorInfo.company}
          fullWidth
          onChange={(event) => props.updateChanges(event, 'donorInfo')}
        />
        <TextField
          name='address'
          label='Address'
          type='string'
          value={donorInfo.address}
          fullWidth
          onChange={(event) => props.updateChanges(event, 'donorInfo')}
        />
        <TextField
          name='email'
          label='Email'
          type='string'
          value={donorInfo.email}
          fullWidth
          onChange={(event) => props.updateChanges(event, 'donorInfo')}
        />
      </div>
    </div>
  );
}

function Review(props) {
  const { hospInfo, reqInfo, donorInfo } = props;
  return (
    <div>
      <Typography variant='h5'>Review</Typography>
      <Typography variant='h6'>Item Information</Typography>
      <Typography variant='body1'>Type: {reqInfo.item}</Typography>
      <Typography variant='body1'>Quantity: {reqInfo.quantity}</Typography>
      <Typography variant='h6'>Hospital Information</Typography>
      <Typography variant='body1'>Name: {hospInfo.name}</Typography>
      <Typography variant='body1'>Address: {hospInfo.address}</Typography>
      <Typography variant='body1'>Contact Person: {hospInfo.contact}</Typography>
      <Typography variant='body1'>Email: {hospInfo.email}</Typography>
      <Typography variant='h6'>Donor Information</Typography>
      <Typography variant='body1'>Name: {donorInfo.name}</Typography>
      <Typography variant='body1'>Company: {donorInfo.company}</Typography>
      <Typography variant='body1'>Address: {donorInfo.address}</Typography>
      <Typography variant='body1'>Email: {donorInfo.email}</Typography>
    </div>
  );
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      hospInfo: props.hospInfo,
      reqInfo: {
        ...props.reqInfo,
        quantity: '',
      },
      donorInfo: {
        name: '',
        company: '',
        address: '',
        email: '',
      },
    };
  }

  getSteps = () => [ 'Donation Details', 'Donor Information', 'Review' ];

  handleStep = (num) => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + num,
    });
  };

  getStepContent = (step) => {
    const { hospInfo, reqInfo, donorInfo } = this.state;
    switch (step) {
      case 0:
        return <DonationDets hospInfo={hospInfo} reqInfo={reqInfo} updateChanges={this.handleFormChange} />;
      case 1:
        return <DonorInfo donorInfo={donorInfo} updateChanges={this.handleFormChange} />;
      case 2:
        return <Review hospInfo={hospInfo} reqInfo={reqInfo} donorInfo={donorInfo} />;
      default:
        throw new Error('Unknown step');
    }
  };

  handleFormChange = (event, category) => {
    const newInfo = { ...this.state[category] };
    newInfo[event.target.name] = event.target.value;
    this.setState({
      [category]: newInfo,
    });
  };

  handleSubmit = (reqInfo) => (event) => {
    this.props.updateQuantityFulfilled(event, reqInfo);
    this.props.history.push(`${this.props.match.url}/success`);
  };

  render() {
    const { activeStep } = this.state;
    const steps = this.getSteps();

    return (
      <React.Fragment>
        <Paper>
          <Typography component='h1' variant='h4' align='center'>
            Donation Form
          </Typography>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {this.getStepContent(activeStep)}
            <div>
              {activeStep !== 0 && (
                <Button variant='outlined' onClick={() => this.handleStep(-1)}>
                  Back
                </Button>
              )}
              {activeStep !== steps.length - 1 && (
                <Button variant='outlined' color='primary' onClick={() => this.handleStep(1)}>
                  Next
                </Button>
              )}
              <Button variant='outlined' onClick={() => this.props.history.push('/')}>
                Cancel
              </Button>
              {activeStep === steps.length - 1 && (
                <Button variant='outlined' color='secondary' onClick={this.handleSubmit(this.state.reqInfo)}>
                  Submit
                </Button>
              )}
            </div>
          </React.Fragment>
        </Paper>
      </React.Fragment>
    );
  }
}

export default Form;
