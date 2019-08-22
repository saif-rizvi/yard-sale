import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    titleBox: {
      marginTop: 32,
      display: 'flex',
    },
    subtitle: {
      marginLeft: 4
    },
    toolbar: {
      margin: theme.spacing(4)
    }
  });
