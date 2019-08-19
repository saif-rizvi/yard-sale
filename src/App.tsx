import React from 'react';
import './App.css';
import { Container, WithStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import styles from './styles';
import withStyles from '@material-ui/core/styles/withStyles';

import ProductCard from './components/productCard';

import data from './data.json';

// Todo: add dynamic importing of images
import snowglobe from './images/snowglobe.jpg';

type Category = string;

class App extends React.Component<WithStyles<typeof styles>> {
  products: Product[];
  categories: Category[];

  constructor(props: any) {
    super(props);
    this.products = data.products;
    this.categories = data.categories;
  };

  render = () => {
    const { classes } = this.props;
    return (
      <Container className="container">
        <Grid container className={classes.titleBox} alignItems="baseline" justify="space-between">
          <Typography variant="h1">
            yard sale.
          </Typography>
          <div className={classes.sideCart}>
            <Typography variant="h5" className={classes.subtitle}>
              please buy my stuff.
            </Typography>
            <ShoppingCartIcon className={classes.shoppingCartIcon}/>
          </div>
        </Grid>
        <Grid container className={classes.productGrid} wrap="wrap" justify="center">
          {
            this.products.map(product => (
              <ProductCard product={product} image={snowglobe}/>
            ))
          }
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(App);
