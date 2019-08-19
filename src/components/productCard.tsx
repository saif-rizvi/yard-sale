import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import { WithStyles } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from './styles';

import { TweenLite } from 'gsap';

type Props = {
  product: Product,
  image: string
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
    this.tween = TweenLite.fromTo(this.cardRef, 1,{y: 0, autoAlpha: 0}, {y: -20, autoAlpha: 1});
  };

  mouseOverTween = () => {
    this.tween = TweenLite.to(
      this.mediaRef, 0.25,
      {height: 324, width: 324, x: -12}
    );
  };

  mouseLeaveTween = () => {
    this.tween = TweenLite.to(
      this.mediaRef, 0.25,
      {height: 300, width: 300, x: 0}
    );
  };

  render = () => {
    const { classes, product, image } = this.props;
    return (
      <div ref={this.setCardRef} key={product.id}>
        <Card 
          className={classes.card}
          onMouseOver={this.mouseOverTween}
          onMouseLeave={this.mouseLeaveTween}
        >
          <CardMedia
            className={classes.media}
            ref={this.setMediaRef}
            image={image}
          />
          <CardContent>
            <Typography variant="h6">
              { product.name }
            </Typography>
            <Typography variant="h6">
              { "$" + String(product.price) }
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(ProductCard);
