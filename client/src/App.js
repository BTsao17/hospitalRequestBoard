import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import { Board, Form } from './components';

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
          priority: 'high',
          quantityFulfilled: 0,
          status: false,
        },
        {
          id: 22,
          hospital_ID: 146,
          dateAdded: new Date('March 22, 2020 10:00:34 GMT-0700'),
          item: 'surgical masks',
          quantity: 300,
          priority: 'mid',
          quantityFulfilled: 100,
          status: false,
        },
        {
          id: 23,
          hospital_ID: 123,
          dateAdded: new Date('March 22, 2020 11:02:55 GMT-0700'),
          item: 'ventilators',
          quantity: 30,
          priority: 'high',
          quantityFulfilled: 10,
          status: false,
        },
        {
          id: 24,
          hospital_ID: 123,
          dateAdded: new Date('March 22, 2020 11:07:43 GMT-0700'),
          item: 'latex gloves',
          quantity: 600,
          priority: 'mid',
          quantityFulfilled: 0,
          status: false,
        },
        {
          id: 25,
          hospital_ID: 146,
          dateAdded: new Date('March 23, 2020 15:00:10 GMT-0700'),
          item: 'scrubs',
          quantity: 50,
          priority: 'low',
          quantityFulfilled: 0,
          status: false,
        },
      ],
    };
  }
  render() {
    const hospitalNamesID = this.state.hospitals.map(({ id, name }) => ({ id, name }));

    return (
      <React.Fragment>
        <CssBaseline>
          <header>
            <h1>Request Board</h1>
          </header>
          <main>
            <Switch>
              <Route
                exact
                path='/'
                render={() => <Board hospitals={hospitalNamesID} requests={this.state.requests} />}
              />
              <Route path='/form' render={() => <Form />} />
            </Switch>
          </main>
        </CssBaseline>
      </React.Fragment>
    );
  }
}

export default App;
