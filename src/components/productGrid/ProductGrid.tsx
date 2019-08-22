import React from 'react';
import { Flipper } from 'react-flip-toolkit/lib';

import ProductCard from '../productCard/ProductCard';

// Todo: add dynamic importing of images
import snowglobe from '../../images/snowglobe.jpg';

type Props = {
  products: Product[],
  modalCallback: (id: number) => void
}

class ProductGrid extends React.Component<Props> {
  render = () => {
    const { products, modalCallback } = this.props;
    return (
      <Flipper className={'productGrid'} flipKey={products.map(p => p.id).join('')} spring='stiff'>
        {products.map(product =>
            <ProductCard product={product} image={snowglobe} key={product.name} modalCallback={modalCallback}/>
        )}
      </Flipper>
    );
  };
}

export default ProductGrid;
