import * as React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '../../reducers';
import { getCategories, getProducts, filterActiveProducts } from '../../actions/products';
import {
  isLoadingSelector,
  activeProductsSelector,
  categoriesSelector,
} from '../../selectors/products';

import App from './App';

import * as Styles from './App.css';

interface StateProps {
  categories: Category[];
  activeProducts: Product[];
  isLoading: boolean;
}

interface DispatchProps {
  getCategories: typeof getCategories;
  getProducts: typeof getProducts;
  filterActiveProducts: typeof filterActiveProducts;
}

type Props = StateProps & DispatchProps;

class AppContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.getCategories();
    this.props.getProducts();
  }

  render() {
    return this.props.isLoading ? (
      <div>Loading...</div>
    ) : (
      <App
        categories={this.props.categories}
        activeProducts={this.props.activeProducts}
        filterActiveProducts={this.props.filterActiveProducts}
      />
    );
  }
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  isLoading: isLoadingSelector(state),
  activeProducts: activeProductsSelector(state),
  categories: categoriesSelector(state),
});

const mapDispatchToProps: DispatchProps = {
  getCategories,
  getProducts,
  filterActiveProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
