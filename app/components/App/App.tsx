import * as React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '../../reducers';
import { getCategories } from '../../actions/products';

interface StateProps {
  categories: Category[];
}

interface DispatchProps {
  getCategories: typeof getCategories;
}

type Props = StateProps & DispatchProps;

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    return <div data-hook="app-container">App!</div>;
  }
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  categories: state.products.categories,
});

const mapDispatchToProps: DispatchProps = {
  getCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
