import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'inline-block'
    },
    card: {
      width: 300,
      height: 422,
      margin: 16,
    },
    media: {
      height: 300,
      width: 300,
      opacity: 0.85
    },
    rolloverWrapper: {
      overflow: 'hidden',
      cursor: 'pointer'
    }
});
