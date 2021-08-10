import React from "react";
import PropTypes from 'prop-types';
import { Component } from "react";
import { Tabs, Tab, Grid, withStyles } from "@material-ui/core"
import {
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { withRouter } from 'react-router';
import Count from './count';
import Cards from './cards';
import { get } from '../state/operations';
import { proxyUrl, routeValues } from '../constants';

class Parent extends Component {
  static propsTypes = {
    classes: PropTypes.shape({}).isRequired,
    location: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);
    const { location: { pathname } } = this.props;
    this.state = {
      selectedTab: routeValues[pathname],
      count: 0,
      cards: [],
    };
  };
  async componentDidMount() {
    const data = await this.getCards();
    let collection = [];
    Object.values(data).forEach((cardArray) => {
      collection = [...collection, ...cardArray];
    });
    this.setState({
      cards: collection,
    });
  };

  handleUpdateCount = (count) => {
    this.setState({
      count,
    });
  };

  handleSwitchTab = (event, value) => {
    this.setState({
      selectedTab: value,
    });
  };

  getCards = async () => {
    const { data } = await get(proxyUrl);
    return data;
  }

  render() {
    const { classes } = this.props;
    const { selectedTab, count, cards } = this.state;
    const parentLabel = `Parent ${2 * count}`;
    return (
      <div>
        <Tabs value={selectedTab} onChange={this.handleSwitchTab}>
          <Tab label={parentLabel} to='/' component={Link} value='parent' />
          <Tab label='Count' to='/count' component={Link} value='count' />
          <Tab label='Cards' to='/cards' component={Link} value='cards' />
        </Tabs>
        <div>
          <hr />
          <Grid container spacing={3} direction='column' className={classes.container}>
            <Grid item>
              <div>Parent counter value: {count}</div>
            </Grid>
            <Grid item>
              <Switch>
                <Route exact path="/">
                </Route>
                <Route path="/count">
                  <Count
                    count={count}
                    updateCount={this.handleUpdateCount}
                  />
                </Route>
                <Route path="/cards">
                  <Cards
                    cards={cards}
                  />
                </Route>
              </Switch>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const styles = () => ({
  container: {
    paddingLeft: '20px',
  },
});

export default withStyles(styles)(withRouter(Parent));