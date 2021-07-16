import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import Home from './Home';
import Nav from './Nav';
import Login from './Login';
import NewPoll from './NewPoll';
import PollQuestion from './PollQuestion';
import PollResult from './PollResult';
import LeaderBoard from './LeaderBoard';
import Score from './Score';
import NotMatch from './NotMatch';
// import createBrowserHistory from 'history/createBrowserHistory';
import { createBrowserHistory } from 'history';

import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    this.props.initializeData();
  }

  // require("history").createBrowserHistory

  render() {
    const history = createBrowserHistory();
    // console.log('History', history);
    return (
      <Router history={history}>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/add" component={NewPoll} />
            <Route exact path="/leaderboard" component={LeaderBoard} />
            <Route exact path="/pollresult/:id" component={PollResult} />
            <Route exact path="/questions/:id" component={PollQuestion} />
            <Route exact path="/scorecard" component={Score} />
            <Route path="*" component={NotMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    initializeData: () => {
      dispatch(handleInitialData());
    },
  };
}

export default connect(null, mapDispatchToProps)(App);
