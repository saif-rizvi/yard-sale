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
    },
    page: {},
    pullover: {
      position: 'absolute',
      top: 0,
      height: '100vh',
      width: '100vw',
      zIndex: 20,
      background: 'white'
    },
    pulloverTitleGrid: {
      margin: '10vw auto',
      width: '50vw'
    },
    pulloverEnter: {
      cursor: 'pointer'
    },
    pulloverProduct: {
      width: '100%',
      height: '100%'
    },
    pulloverProductMedia: {
      height: '75vh'
    },
    container: {
      paddingTop: 32
    }
  });
