import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    formControl: {
      minWidth: 120,
    },
    toolbar: {
      margin: '32px 0',
    }
  });
