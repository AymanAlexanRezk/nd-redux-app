import React, { Component } from 'react';
import { handleAddQuestion } from '../actions/questions';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class NewPoll extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false,
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { optionOne, optionTwo } = this.state;
    this.props.dispatch(handleAddQuestion(optionOne, optionTwo));
    // add in store
    this.setState({
      optionOne: '',
      optionTwo: '',
      toHome: true,
    });
  };

  render() {
    const { toHome } = this.state;

    const { authedUser } = this.props;
    if (!authedUser) {
      return <Redirect to="/login" />;
    }

    if (toHome) {
      return <Redirect to={'/home'} />;
    }

    return (
      <div>
        <div className="newPollContainer">
          <Paper className="newPollPaper">
            <div className="newPollBoxHeader">Create New Poll</div>
            <div className="newPollControls">
              <div>Complete the question:</div>
              <div className="newPollText">Would you rather...</div>
              <form>
                <TextField
                  id="outlined-name"
                  label="Option One"
                  className="newPollFormControl"
                  value={this.state.optionOne}
                  onChange={this.handleChange('optionOne')}
                  margin="normal"
                  variant="outlined"
                />
                <div className="newPollSeparator">OR</div>
                <TextField
                  id="outlined-name"
                  label="Option Two"
                  className="newPollFormControl"
                  value={this.state.optionTwo}
                  onChange={this.handleChange('optionTwo')}
                  margin="normal"
                  variant="outlined"
                />
              </form>
            </div>
            <Button
              variant="contained"
              color="secondary"
              className="newPollFormControl"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </Paper>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(NewPoll);
