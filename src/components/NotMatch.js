import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class NotMatch extends Component {
  render() {
    return (
      <div>
        <div className="notFoundContainer">
          <Paper>
            <div className="notFoundHeader">
              <div className="notFoundTitle">404 Error: No Match!</div>
              <div className="notFoundMessage">
                The URL is not valid, Please use the menu and try again.
              </div>
            </div>

            <Button
              variant="contained"
              color="inherit"
              className="notFoundformControl"
              component={Link}
              to={'/home'}
            >
              GoTo Home Page
            </Button>
          </Paper>
        </div>
      </div>
    );
  }
}

export default NotMatch;
