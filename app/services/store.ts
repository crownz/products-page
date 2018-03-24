import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from '../reducers';

export function configureStore(initialState = {}) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const middlewares = [reduxThunk];
  return createStore(reducers, initialState, composeEnhancers(applyMiddleware(...middlewares)));
}
