import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import { WithStyles } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from './styles';

import { TweenLite } from 'gsap';
import Grid from '@material-ui/core/Grid';
import { Flipped } from 'react-flip-toolkit/lib';

type Props = {
  product: Product,
  modalCallback: (productId: number) => void
} & WithStyles<typeof styles>

class ProductCard extends React.Component<Props> {
  cardRef: HTMLElement | null;
  mediaRef: HTMLElement | null;
  setCardRef: any;
  setMediaRef: any;
  tween: ReturnType<typeof TweenLite.to> | null;

  constructor(props: Props) {
    super(props);
    this.cardRef = null;
    this.mediaRef = null;
    this.setCardRef = (element: HTMLElement) => {
      this.cardRef = element;
    };
    this.setMediaRef = (element: HTMLElement) => {
      this.mediaRef = element;
    };
    this.tween = null;
  };

  componentDidMount = () => {
    this.tween = TweenLite.from(
      this.cardRef, 0.3,
      {y: 30, autoAlpha: 0}
    );
  };

  mouseOverTween = () => {
    this.tween = TweenLite.to(
      this.mediaRef, 0.3,
      {scale: 1.1, opacity: 1},
    );
  };

  mouseLeaveTween = () => {
    this.tween = TweenLite.to(
      this.mediaRef, 0.3,
      {scale: 1.0, opacity: 0.85}
    );
  };

  render = () => {
    const {classes, product} = this.props;

    return (
      <Flipped flipId={product.name}>
        <div className={classes.wrapper}>
          <Card
            className={classes.card}
            ref={this.setCardRef}
          >
            <div className={classes.rolloverWrapper}
                 onMouseEnter={this.mouseOverTween}
                 onMouseLeave={this.mouseLeaveTween}
                 onClick={this.handleClick}
            >
              <CardMedia
                className={classes.media}
                ref={this.setMediaRef}
                image={process.env.PUBLIC_URL + product.imageSrc}
              />
            </div>
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
            </CardContent>
          </Card>
        </div>
      </Flipped>
    )
  };

  private handleClick = () => {
    const {product, modalCallback} = this.props;
    modalCallback(product.id);
  };

  private ratingToStars = (rating: number) => {
    const stars = ['☆', '☆', '☆', '☆', '☆'];
    stars.fill('★', 0, rating);
    return (stars.join(''));
  };
}

export default withStyles(styles)(ProductCard);
