import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from '../reducers';

export function configureStore(initialState = {}) {
  const middlewares = [reduxThunk];
  return createStore(reducers, initialState, applyMiddleware(...middlewares));
}
