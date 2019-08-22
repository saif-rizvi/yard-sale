import React from 'react';
import { Flipper } from 'react-flip-toolkit/lib';

import ProductCard from '../productCard/ProductCard';

type Props = {
  products: Product[],
  modalCallback: (productId: number) => void
}

class ProductGrid extends React.Component<Props> {
  render = () => {
    const { products, modalCallback } = this.props;
    return (
      <Flipper className={'productGrid'} flipKey={products.map(p => p.id).join('')} spring='stiff'>
        {products.map(product =>
            <ProductCard product={product} key={product.name} modalCallback={modalCallback} />
        )}
      </Flipper>
    );
  };
}

export default ProductGrid;
