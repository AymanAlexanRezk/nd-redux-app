import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { formatQuestion } from '../utils/helpers';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

class PollResult extends Component {
  calculateOptionResult(votes, question) {
    return (
      (votes /
        (question.optionOne.votes.length + question.optionTwo.votes.length)) *
      100
    );
  }
  render() {
    const { question, authedUser } = this.props;

    if (!authedUser) {
      return <Redirect to="/login" />;
    }

    if (!question) {
      return null;
    }

    return (
      <div className="pollResultsContainer">
        <Paper className="pollResultsPaper">
          <div className="pollResultsBoxHeader">
            {question.authorName} asks:
          </div>
          <div className="pollResultsControls">
            <Grid container spacing={4}>
              <Grid item xs={3} alignItems="center" justifyContent="center" container>
                <div>
                  <img
                    className="scoreCardImg"
                    alt="complex"
                    src={question.avatar}
                  />
                </div>
              </Grid>
              <Grid item xs={1}>
                <div className="pollResultsSeparator"></div>
              </Grid>
              <Grid item xs={8} container direction="column">
                <Grid item>
                  <div className="pollResultsMainTitle">Results:</div>
                </Grid>
                <Grid item className="pollResultsAnswerGrid">
                  <Paper className="pollResultsAnswerPaper">
                    {question.optionOne.votes.includes(authedUser) ? (
                      <div className="pollResultsUserVoteDiv">&#10003;</div>
                    ) : null}
                    <Grid container spacing={4} direction="column">
                      <Grid item>
                        Would you rather {question.optionOne.text}
                      </Grid>
                      <Grid item>
                        <LinearProgress
                          variant="determinate"
                          value={this.calculateOptionResult(
                            question.optionOne.votes.length,
                            question
                          )}
                          className="pollResultsAnswerProgress"
                        />
                      </Grid>
                      <Grid item className="pollResultsVoteCount">
                        {question.optionOne.votes.length} out of{' '}
                        {question.optionOne.votes.length +
                          question.optionTwo.votes.length}{' '}
                        votes
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item className="pollResultsAnswerGrid">
                  <Paper className="pollResultsAnswerPaper">
                    {question.optionTwo.votes.includes(authedUser) ? (
                      <div className="pollResultsUserVoteDiv">&#10003;</div>
                    ) : null}
                    <Grid container spacing={4} direction="column">
                      <Grid item>
                        Would you rather {question.optionTwo.text}
                      </Grid>
                      <Grid item>
                        <LinearProgress
                          variant="determinate"
                          value={this.calculateOptionResult(
                            question.optionTwo.votes.length,
                            question
                          )}
                          className="pollResultsAnswerProgress"
                        />
                      </Grid>
                      <Grid item className="pollResultsVoteCount">
                        {question.optionTwo.votes.length} out of{' '}
                        {question.optionOne.votes.length +
                          question.optionTwo.votes.length}{' '}
                        votes
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid>
              <Button
                variant="contained"
                className="formControl"
                color="primary"
                component={Link}
                to={'/home'}
              >
                Back
              </Button>
            </Grid>
          </div>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;
  return {
    authedUser,
    question: questions[id]
      ? formatQuestion(questions[id], users[questions[id].author], authedUser)
      : null,
  };
}

export default connect(mapStateToProps)(PollResult);
