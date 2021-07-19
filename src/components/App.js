import React, { Component, Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
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
import { connect } from 'react-redux';
class App extends Component {
  componentDidMount() {
    this.props.initializeData();
  }

  render() {
    return (
      <Fragment>
        <Nav />
        <Switch>
          <Route path="/pollresult/:id" component={PollResult} />
          <Route path="/questions/:id" component={PollQuestion} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/add" component={NewPoll} />
          <Route path="/leaderboard" component={LeaderBoard} />
          <Route path="/scorecard" component={Score} />
          <Route path="/no-match" component={NotMatch} />
          <Route path="/" exact component={Home} />
          <Redirect to="/no-match" />
        </Switch>
      </Fragment>
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
