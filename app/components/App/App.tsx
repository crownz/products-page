import * as React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '../../reducers';
import { getCategories, filterActiveProducts } from '../../actions/products';

import * as Styles from './App.css';

interface AppProps {
  categories: Category[];
  activeProducts: Product[];
  filterActiveProducts: typeof filterActiveProducts;
}

interface AppState {
  activeCategoryId: string;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    const activeCategoryId =
      (props.categories && props.categories.length > 0 && props.categories[0].id) || null;
    this.state = { activeCategoryId };
  }

  componentDidMount() {
    this.props.filterActiveProducts(this.state.activeCategoryId);
  }

  setActiveCategory = (categoryId: string) => {
    this.setState({ activeCategoryId: categoryId }, () => {
      this.props.filterActiveProducts(categoryId);
    });
  };

  render() {
    const { categories, activeProducts } = this.props;
    const { activeCategoryId } = this.state;
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

export default App;
