import React, { Component } from 'react';
import Score from './Score';
import { calculateUserScore } from '../utils/helpers';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class LeaderBoard extends Component {
  render() {
    const { userIds, authedUser } = this.props;

    if (!authedUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="leaderBoardContainer">
        <Grid container spacing={4} direction="column">
          {userIds.map((id) => (
            <Grid key={id} item xs={12}>
              <Score id={id}></Score>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }) {
  return {
    authedUser,
    userIds: Object.keys(users).sort(
      (a, b) => calculateUserScore(users[b]) - calculateUserScore(users[a])
    ),
  };
}

export default connect(mapStateToProps, null)(LeaderBoard);
