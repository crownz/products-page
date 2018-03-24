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
  filterActiveProducts: (category: string, fitler: string) => void;
  activeCategoryId: string;
}

export type AppProps = OwnProps & RouterProps;

interface State {
  searchString: string;
}

export class App extends React.Component<AppProps, State> {
  state: State = {
    searchString: '',
  };

  componentDidMount() {
    if (this.props.activeCategoryId) {
      this.props.filterActiveProducts(this.props.activeCategoryId, this.state.searchString);
    } else {
      const firstCategoryId =
        this.props.categories && this.props.categories.length > 0 && this.props.categories[0].id;
      this.props.history.push(`/products/${firstCategoryId}`);
    }
  }

  componentDidUpdate(oldProps: AppProps) {
    if (oldProps.activeCategoryId !== this.props.activeCategoryId) {
      this.props.filterActiveProducts(this.props.activeCategoryId, this.state.searchString);
    }
  }

  setActiveCategory = (categoryId: string) => this.props.history.push(`/products/${categoryId}`);
  filterProducts = (searchString: string) => {
    this.setState({ searchString }, () => {
      this.props.filterActiveProducts(this.props.activeCategoryId, searchString);
    });
  };

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
      <div data-hook="app-container">
        <div className={Styles.categories} data-hook="categories-container">
          <div className={Styles.categoriesTitle} data-hook="categories-title">
            Store Cupboard
          </div>
          {this.renderCategories()}
        </div>
        <div className={Styles.products}>
          <input
            data-hook="filter-input"
            className={Styles.search}
            value={this.state.searchString}
            onChange={e => this.filterProducts(e.target.value)}
          />
          <div data-hook="products-container">{this.renderProducts()}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
