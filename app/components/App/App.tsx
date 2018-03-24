import * as React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '../../reducers';
import { getCategories } from '../../actions/products';

import * as Styles from './App.css';

interface StateProps {
  categories: Category[];
}

interface DispatchProps {
  getCategories: typeof getCategories;
}

type Props = StateProps & DispatchProps;

interface State {
  activeCategoryId: string;
}

class App extends React.Component<Props, State> {
  state: State = {
    activeCategoryId: null,
  };

  componentDidMount() {
    this.props.getCategories();
  }

  setActiveCategory = (categoryId: string) => this.setState({ activeCategoryId: categoryId });

  render() {
    const { categories } = this.props;
    const { activeCategoryId } = this.state;
    return (
      <div data-hook="app-container" className={Styles.container}>
        {categories && (
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
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  categories: state.products.categories,
});

const mapDispatchToProps: DispatchProps = {
  getCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
