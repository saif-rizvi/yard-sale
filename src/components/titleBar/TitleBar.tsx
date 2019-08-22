import { withStyles, WithStyles } from '@material-ui/core';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import styles from './styles';

type Props = {
  squished: boolean
} & WithStyles<typeof styles>

class TitleBar extends React.Component<Props> {
  render = () => {
    const { classes } = this.props;
    return (
      <Grid container className={classes.titleBox} alignItems="baseline" justify="space-between">
        <Typography variant="h3">
          yard sale.
        </Typography>
        <Typography variant="h5">
          please buy my stuff.
        </Typography>
      </Grid>
    );
  }
}

export default withStyles(styles)(TitleBar)