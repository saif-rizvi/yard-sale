import React from 'react';

import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, WithStyles } from '@material-ui/core';
import styles from './styles';
import withStyles from '@material-ui/core/styles/withStyles';

import TitleBar from './components/titleBar/TitleBar';
import ProductGrid from './components/productGrid/ProductGrid';

import data from './data.json';

type Category = string;

type State = {
  products: Product[];
  filteredProducts: Product[];
  categories: Category[];
  categoryFilter: string;
  sortBy: string;
}

class App extends React.Component<WithStyles<typeof styles>, State> {
  state = {
    products: data.products,
    filteredProducts: data.products,
    categories: data.categories,
    categoryFilter: "",
    sortBy: ""
  };

  render = () => {
    const {classes} = this.props;
    const {filteredProducts, categories, categoryFilter, sortBy} = this.state;

    return (
      <Container className="container" maxWidth={'xl'}>
        <div>
          <TitleBar squished={false} />
          <Grid container className={classes.toolbar} justify="flex-end" alignItems="flex-end">
            <Button onClick={this.handleReset} disabled={!(sortBy || categoryFilter)}>reset</Button>
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="category-filter">category</InputLabel>
                <Select
                  value={categoryFilter}
                  onChange={this.handleFilterChange}
                  inputProps={{
                    name: 'category',
                    id: 'category-filter',
                  }}
                >
                  {categories.map((category, i) => (
                    <MenuItem key={i} value={category} button={true}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="sort-by">sort by</InputLabel>
                <Select
                  value={sortBy}
                  onChange={this.handleSortByChange}
                  inputProps={{
                    name: 'sortBy',
                    id: 'sort-by',
                  }}
                >
                  <MenuItem value="name" button={true}>name</MenuItem>
                  <MenuItem value="price-lth" button={true}>price: low to high</MenuItem>
                  <MenuItem value="price-htl" button={true}>price: high to low</MenuItem>
                  <MenuItem value="rating" button={true}>highest rating</MenuItem>
                  <MenuItem value="popularity" button={true}>most popular</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Grid>
          <ProductGrid products={filteredProducts} modalCallback={this.openModal}/>
        </div>
      </Container>
    );
  };

  private openModal = () => {
    // todo: modal stuff
  };

  private handleFilterChange = (event: React.ChangeEvent<any>) => {
    const {products, sortBy} = this.state;
    this.setState({
      categoryFilter: event.target.value,
      filteredProducts: this.sortProductsBy(products.filter(product => product.category === event.target.value), sortBy)
    });
  };

  private handleSortByChange = (event: React.ChangeEvent<any>) => {
    const {filteredProducts} = this.state;
    const sortField: string = event.target.value;

    const freshFilter: Product[] = this.sortProductsBy(filteredProducts, sortField);
    this.setState({
      sortBy: sortField,
      filteredProducts: freshFilter
    });
  };

  private sortProductsBy = (products: Product[], key: string) => {
    switch (key) {
      case "name":
        return products.sort((p1, p2) => p1.name.localeCompare(p2.name));
      case "price-lth":
        return products.sort((p1, p2) => p1.price - p2.price);
      case "price-htl":
        return products.sort((p1, p2) => p2.price - p1.price);
      case "rating":
        return products.sort((p1, p2) => p2.rating - p1.rating);
      case "popularity":
        return products.sort((p1, p2) => p2.popularity - p1.popularity);
      default:
        return products;
    }
  };

  private handleReset = (event: any) => {
    const {products} = this.state;
    this.setState({
      filteredProducts: products.sort((p1: Product, p2: Product) => p1.id - p2.id),
      categoryFilter: "",
      sortBy: ""
    })
  };
}

export default withStyles(styles)(App);
