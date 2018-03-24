import * as React from 'react';

import * as Styles from './Product.css';

export interface Props {
  title: string;
  description: string;
}

interface State {
  isActive: boolean;
}

class Product extends React.Component<Props, State> {
  state: State = {
    isActive: false,
  };

  toggleDescription = () => this.setState({ isActive: !this.state.isActive });

  render() {
    return (
      <div className={Styles.container} data-hook="product">
        <div
          className={`${Styles.title} ${this.state.isActive ? Styles.active : ''}`}
          onClick={this.toggleDescription}
          data-hook="product-title"
        >
          {this.props.title}
        </div>
        {this.state.isActive && (
          <div className={Styles.description} data-hook="product-description">
            {this.props.description}
          </div>
        )}
      </div>
    );
  }
}

export default Product;
