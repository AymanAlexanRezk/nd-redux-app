import React, { Component } from 'react';
import { handleAddAnswer } from '../actions/questions';
import { formatQuestion } from '../utils/helpers';
import { Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';


class PollQuestion extends Component {
  state = {
    value: '',
    toPollResult: false,
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { value } = this.state;
    this.props.dispatch(handleAddAnswer(this.props.qid, value));
    this.setState({
      value: '',
      toPollResult: true,
    });
  };

  render() {
    const { question, authedUser } = this.props;

    if (!authedUser) {
      return <Redirect to="/login" />;
    }

    if (!question) {
      return null;
    }

    if (this.state.toPollResult) {
      return <Redirect to={`/pollresult/${question.id}`} />;
    }

    return (
      <div className="questionContainer">
        <Paper className="questionPaper">
          <div className="questionBoxHeader">{question.authorName} asks:</div>
          <div className="questionControls">
            <Grid container spacing={4}>
              <Grid item xs={4} alignItems="center" justifyContent="center" container>
                <div>
                  <img
                    className="scoreCardImg"
                    alt="complex"
                    src={question.avatar}
                  />
                </div>
              </Grid>
              <Grid item xs={1}>
                <div className="questionSeparator"></div>
              </Grid>
              <Grid item xs={7} container direction="column">
                <Grid item>
                  <div className="questionMainTitle">Would you Rather?</div>
                </Grid>
                <Grid item>
                  <div>
                    <RadioGroup
                      aria-label="Gender"
                      name="gender1"
                      value={this.state.value}
                      onChange={this.handleChange}
                    >
                      <FormControlLabel
                        value="optionOne"
                        control={<Radio />}
                        label={question.optionOne.text}
                      />
                      <FormControlLabel
                        value="optionTwo"
                        control={<Radio />}
                        label={question.optionTwo.text}
                      />
                    </RadioGroup>
                  </div>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="questionFormControl"
                    onClick={this.handleSubmit}
                    disabled={this.state.value === ''}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
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
    qid: id,
    question: questions[id]
      ? formatQuestion(questions[id], users[questions[id].author], authedUser)
      : null,
  };
}

export default connect(mapStateToProps)(PollQuestion);
