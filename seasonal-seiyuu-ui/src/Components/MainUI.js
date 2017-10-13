import React, { Component } from 'react';
import Header from './Header';
import HomePage from './HomePage';
import SeiyuuProfile from './SeiyuuProfile';
import { Row, Grid } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

class MainUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    }
  }

  searchBoxChangeHandler = (event) => {
    this.setState({
      searchValue: event.target.value
    })
  }

  render() {
    return (
      <div>
        <head>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        </head>  
        <Header searchValue={this.state.searchValue} searchBoxChangeHandler={this.searchBoxChangeHandler} />
        <Grid fluid={true}>
          <Row>
              <Route exact path={this.props.match.url} render={() => <HomePage searchValue={this.state.searchValue} />} />
              <Route path={this.props.match.url + "seiyuu/:id"} component={SeiyuuProfile} />
          </Row>
        </Grid>
      </div>
    );
  }
};

export default MainUI;