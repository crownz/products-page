import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { ReduxState } from '../../reducers';
import { getCategories, filterActiveProducts } from '../../actions/products';

import * as Styles from './App.css';

interface RouterProps {
  history: {
    push: (url: string) => void;
  };
}

interface OwnProps {
  categories: Category[];
  activeProducts: Product[];
  filterActiveProducts: typeof filterActiveProducts;
  activeCategoryId: string;
}

type AppProps = OwnProps & RouterProps;

class App extends React.Component<AppProps> {
  componentDidMount() {
    if (this.props.activeCategoryId) {
      this.props.filterActiveProducts(this.props.activeCategoryId);
    } else {
      const firstCategoryId = this.props.categories[0].id;
      this.props.history.push(`/products/${firstCategoryId}`);
    }
  }

  componentDidUpdate(oldProps: AppProps) {
    if (oldProps.activeCategoryId !== this.props.activeCategoryId) {
      this.props.filterActiveProducts(this.props.activeCategoryId);
    }
  }

  setActiveCategory = (categoryId: string) => this.props.history.push(`/products/${categoryId}`);

  render() {
    const { categories, activeProducts, activeCategoryId } = this.props;
    return (
      <div data-hook="app-container" className={Styles.container}>
        <div className={Styles.categories}>
          <div className={Styles.categoriesTitle}>Store Cupboard</div>
          {categories.map(category => (
            <div
              className={`${Styles.category} ${
                activeCategoryId === category.id ? Styles.active : ''
              }`}
              onClick={() => this.setActiveCategory(category.id)}
              key={category.id}
            >
              {category.title}
            </div>
          ))}
        </div>
        <div className={Styles.products}>
          {activeProducts.map(product => (
            <div className={Styles.product} key={product.id}>
              {product.title}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(App);
