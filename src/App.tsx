import React from 'react';

import Typography from '@material-ui/core/Typography';
import { TweenLite } from 'gsap';
import ExpandedProductCard from './components/expandedProductCard/ExpandedProductCard';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import styles from './styles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

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
  selectedProductId: number;
}

class App extends React.Component<WithStyles<typeof styles>, State> {
  state = {
    products: data.products,
    filteredProducts: data.products,
    categories: data.categories,
    categoryFilter: "",
    sortBy: "",
    selectedProductId: 0
  };

  private pulloverRef: HTMLElement | null = null;
  private pulloverTitleRef: HTMLElement | null = null;
  private pulloverSubtitleRef: HTMLElement | null = null;
  private pulloverEnterRef: HTMLElement | null = null;
  private tween: ReturnType<typeof TweenLite.to> | null = null;

  private setPulloverRef = (element: HTMLElement | null) => {
    this.pulloverRef = element;
  };

  private setPulloverTitleRef = (element: HTMLElement) => {
    this.pulloverTitleRef = element;
  };

  private setPulloverSubtitleRef = (element: HTMLElement) => {
    this.pulloverSubtitleRef = element;
  };

  private setPulloverEnterRef = (element: HTMLElement) => {
    this.pulloverEnterRef = element;
  };

  componentDidMount = () => {
    this.tween = TweenLite.from(
      this.pulloverTitleRef, 1.2,
      {y: 40, autoAlpha: 0}
    );
    this.tween = TweenLite.from(
      this.pulloverSubtitleRef, 1.7,
      {x: 60, autoAlpha: 0}
    );

    this.tween = TweenLite.from(
      this.pulloverEnterRef, 2,
      {x: -60, autoAlpha: 0}
    );
  };

  render = () => {
    const {classes} = this.props;
    const {filteredProducts, categories, categoryFilter, sortBy, selectedProductId} = this.state;

    return (
      <div className={classes.page}>
        <div className={classes.pullover} ref={this.setPulloverRef}>
          {!selectedProductId &&
          <>
            <Grid container direction='column' className={classes.pulloverTitleGrid}>
              <Typography variant='h1' ref={this.setPulloverTitleRef}>
                yard sale.
              </Typography>
              <Typography variant='h4' ref={this.setPulloverSubtitleRef}>
                please. buy my stuff.
              </Typography>
              <Typography className={classes.pulloverEnter} variant='body1' color='primary' onClick={this.pullUpPullover} ref={this.setPulloverEnterRef}>
                come on over.
              </Typography>
            </Grid>
          </>
          }
          {selectedProductId > 0 &&
          <div className={classes.pulloverProduct}>
            <ExpandedProductCard
              product={filteredProducts.filter(p => p.id === selectedProductId)[0]}
              closePulloverCallback={this.pullUpPullover}
            />
          </div>
          }
        </div>
        <Container className={classes.container} maxWidth={'xl'}>
          <TitleBar />
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
          <ProductGrid products={filteredProducts} modalCallback={this.openPullover} />
        </Container>
      </div>
    );
  };

  private pullUpPullover = () => {
    this.tween = TweenLite.to(
      this.pulloverRef, 0.5,
      {y: window.scrollY - window.screen.height, display: 'none'}
    );
  };

  private pullDownPullover = () => {
    this.tween = TweenLite.fromTo(
      this.pulloverRef,
      0.5,
      {y: window.scrollY - window.screen.height},
      {y: window.scrollY, display: 'block'}
    );
  };

  private openPullover = (productId: number) => {
    this.setState({selectedProductId: productId});
    this.pullDownPullover();
  };

  private handleFilterChange = (event: React.ChangeEvent<any>) => {
    const {products, sortBy} = this.state;
    this.setState({
      categoryFilter: event.target.value,
      filteredProducts: this.sortProductsBy(products.filter(product => product.category === event.target.value), sortBy),
      selectedProductId: 0
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
