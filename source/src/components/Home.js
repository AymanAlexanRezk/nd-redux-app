import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PollItems from './PollItems';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { authedUser } = this.props;

    if (!authedUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="homeContainer">
        <Paper>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12}>
              <Tabs
                value={value}
                onChange={this.handleChange}
                variant="fullWidth"
              >
                <Tab label="Unanswered Questions" />
                <Tab label="Answered Questions" />
              </Tabs>
            </Grid>
            <Grid item xs={12}>
              {value === 0 && <PollItems answered={false}></PollItems>}
              {value === 1 && <PollItems answered={true}></PollItems>}
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(Home);
