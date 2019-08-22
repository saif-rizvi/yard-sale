import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { WithStyles } from '@material-ui/core';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

type Props = {
  product: Product,
} & WithStyles<typeof styles>

class ExpandedProductCard extends React.Component<Props> {
  render = () => {
    const {classes, product} = this.props;

    return (
      <div className={classes.wrapper}>
        <Card
          className={classes.card}
        >
          <CardMedia
            className={classes.media}
            image={process.env.PUBLIC_URL + product.imageSrc}
          />
          <CardContent>
            <Typography variant="h6">
              {product.name}
            </Typography>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Typography variant="body1">
                {"$" + String(product.price)}
              </Typography>
              <Typography variant="body2" color="error">
                {product.inStock ? "" : "[out of stock]"}
              </Typography>
              <Typography variant="body1">
                {this.ratingToStars(product.rating)}
              </Typography>
            </Grid>
            <Typography variant="body2">
              {product.description}
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  };

  private ratingToStars = (rating: number) => {
    const stars = ['☆', '☆', '☆', '☆', '☆'];
    stars.fill('★', 0, rating);
    return (stars.join(''));
  };
}

export default withStyles(styles)(ExpandedProductCard);
