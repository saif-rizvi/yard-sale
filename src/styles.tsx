import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    titleBox: {
      marginTop: 32,
      display: 'flex',
    },
    subtitle: {
      marginLeft: 4
    },
    listItem: {
      borderRadius: 8
    },
    productGrid: {
      marginTop: 32,
    },
    sideCart: {
      display: 'flex',
      alignItems: "baseline"
    },
    shoppingCartIcon: {
      marginLeft: 8
    }
});
