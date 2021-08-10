import React, { Component } from "react";
import PropTypes from 'prop-types';
import { IconButton, Grid, TextField, withStyles } from '@material-ui/core';
import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


class Count extends Component {
  static propTypes = {
    count: PropTypes.number,
    updateCount: PropTypes.func.isRequired,
    classes: PropTypes.shape({}).isRequired,
  };
  static defaultProps = {
    count: 0,
  };

  handleIncrement = () => {
    const { count, updateCount } = this.props;
    updateCount(count + 1);
  };

  handleDecrement = () => {
    const { count, updateCount } = this.props;
    updateCount(count - 1);
  };

  render() {
    const { count, classes } = this.props;
    return (
      <Grid container item spacing={2} direction='row' justifyContent='flex-start' alignItems='center' xs={3}>
        <Grid container item xs={4} justifyContent='center'>
          <IconButton
            variant='contained'
            onClick={this.handleIncrement}
            className={classes.addButton}
          >
            <AddIcon />
          </IconButton>
        </Grid>
        <Grid container item justifyContent='center' xs={3}>
          <TextField
            id="outlined-helperText"
            helperText="Count"
            variant="outlined"
            value={count}
          />
        </Grid>
        <Grid container item justifyContent='center' xs={4}>
          <IconButton
            variant='contained'
            onClick={this.handleDecrement}
            className={classes.minusButton}
          >
            <RemoveIcon />
          </IconButton>
        </Grid>
      </Grid>
    )
  }
}
const styles = () => ({
  addButton: {
    backgroundColor: blue[500],
  },
  minusButton: {
    backgroundColor: red[500],
  },
});

export default withStyles(styles)(Count);
