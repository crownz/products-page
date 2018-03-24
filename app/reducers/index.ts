import { combineReducers } from 'redux';

import products, { ProductsState } from './products';

export interface ReduxState {
  products: ProductsState;
}

export default combineReducers({
  products,
});
