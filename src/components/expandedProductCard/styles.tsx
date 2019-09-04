import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'inline-block',
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0
    },
    card: {
      width: '90%',
      height: '90%',
      margin: '5%',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.up('lg')]: {
        flexDirection: 'row',
      }
    },
    media: {
      height: '100%',
      width: '80%',
      [theme.breakpoints.down('lg')]: {
        width: '100%',
      },
    },
    content: {
      width: 'inherit',
      [theme.breakpoints.up('lg')]: {
        width: '30vw',
      },
    },
    upArrow: {
      cursor: 'pointer',
      height: '1.5em',
      width: '1.5em',
    },
});
