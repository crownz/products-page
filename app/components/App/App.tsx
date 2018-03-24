import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { ReduxState } from '../../reducers';
import { getCategories, filterActiveProducts } from '../../actions/products';

import ProductComponent from '../Product';
import CategoryComponent from '../Category';

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

  renderProducts = () => {
    return this.props.activeProducts.map(product => (
      <ProductComponent key={product.id} title={product.title} description={product.description} />
    ));
  };

  renderCategories = () => {
    return this.props.categories.map(category => (
      <CategoryComponent
        key={category.id}
        title={category.title}
        id={category.id}
        setActive={this.setActiveCategory}
        isActive={this.props.activeCategoryId === category.id}
      />
    ));
  };

  render() {
    return (
      <div data-hook="app-container" className={Styles.container}>
        <div className={Styles.categories}>
          <div className={Styles.categoriesTitle}>Store Cupboard</div>
          {this.renderCategories()}
        </div>
        <div className={Styles.products}>{this.renderProducts()}</div>
      </div>
    );
  }
}

export default withRouter(App);
