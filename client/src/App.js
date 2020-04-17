import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import './App.css';
import { Board, Form, ConfirmPage } from './components';
import produce from 'immer';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      hospitals: [
        {
          id: 123,
          name: 'Richmond Hospital',
          address: '7000 Westminster Hwy, Richmond BC, V6X 1A2, Canada',
          contact: 'Jane Doe',
          email: 'jdoe@richmondhosp.ca',
        },
        {
          id: 146,
          name: 'Vancouver General Hospital',
          address: '899 W 12th Ave, Vancouver BC, V5Z 1M9, Canada',
          contact: 'John Smith',
          email: 'jsmith@vgh.ca',
        },
      ],
      requests: [
        {
          id: 21,
          hospital_ID: 123,
          dateAdded: new Date('March 20, 2020 15:00:40 GMT-0700'),
          item: 'surgical masks',
          quantity: 500,
          quantityFulfilled: 0,
          status: false,
        },
        {
          id: 22,
          hospital_ID: 146,
          dateAdded: new Date('March 22, 2020 10:00:34 GMT-0700'),
          item: 'surgical masks',
          quantity: 300,
          quantityFulfilled: 100,
          status: false,
        },
        {
          id: 23,
          hospital_ID: 123,
          dateAdded: new Date('March 22, 2020 11:02:55 GMT-0700'),
          item: 'ventilators',
          quantity: 30,
          quantityFulfilled: 10,
          status: false,
        },
        {
          id: 24,
          hospital_ID: 123,
          dateAdded: new Date('March 22, 2020 11:07:43 GMT-0700'),
          item: 'latex gloves',
          quantity: 600,
          quantityFulfilled: 0,
          status: false,
        },
        {
          id: 25,
          hospital_ID: 146,
          dateAdded: new Date('March 23, 2020 15:00:10 GMT-0700'),
          item: 'scrubs',
          quantity: 50,
          quantityFulfilled: 0,
          status: false,
        },
      ],
      donationFormHospInfo: {
        id: null,
        name: '',
        address: '',
        contact: '',
        email: '',
      },
      donationFormReqInfo: {
        id: null,
        item: '',
      },
    };
  }

  handleRequestChoice = (event, id) => {
    const chosenRequest = this.state.requests.find((request) => request.id === id);
    const hospitalInfo = this.state.hospitals.find((hospital) => hospital.id === chosenRequest.hospital_ID);
    let newObj = (({ id, item }) => ({ id, item }))(chosenRequest);

    this.setState({
      donationFormHospInfo: hospitalInfo,
      donationFormReqInfo: newObj,
    });
  };

  updateQuantityFulfilled = (event, donationInfo) => {
    const updatedReqsArr = [ ...this.state.requests ].map((req) => {
      if (req.id === donationInfo.id) {
        return produce(req, (draft) => {
          draft.quantityFulfilled += Number(donationInfo.quantity);
        });
      }
      else {
        return req;
      }
    });
    this.setState({
      requests: updatedReqsArr,
    });
  };

  render() {
    const { hospitals } = this.state;
    const hospitalNamesID = hospitals.map(({ id, name }) => ({ id, name }));
    const unfulfilledReqs = this.state.requests.filter((req) => req.quantityFulfilled / req.quantity < 1);

    return (
      <React.Fragment>
        <CssBaseline>
          <header className='header-padding'>
            <Typography component='h1' variant='h2'>
              Medical Supply Request Board
            </Typography>
          </header>
          <main>
            <Switch>
              <Route
                exact
                path='/'
                render={(routeProps) => (
                  <Board
                    {...routeProps}
                    hospitals={hospitalNamesID}
                    requests={unfulfilledReqs}
                    onRequestChoice={this.handleRequestChoice}
                  />
                )}
              />
              <Route
                exact
                path='/donate/:id'
                render={(routeProps) => (
                  <Form
                    {...routeProps}
                    hospInfo={this.state.donationFormHospInfo}
                    reqInfo={this.state.donationFormReqInfo}
                    updateQuantityFulfilled={this.updateQuantityFulfilled}
                  />
                )}
              />
              <Route exact path='/donate/:id/success' render={(routeProps) => <ConfirmPage {...routeProps} />} />
            </Switch>
          </main>
        </CssBaseline>
      </React.Fragment>
    );
  }
}

export default App;
