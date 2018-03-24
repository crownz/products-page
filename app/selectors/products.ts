import { createSelector } from 'reselect';
import { ReduxState } from '../reducers';

const productsStateSelector = (state: ReduxState) => state.products;

const categoriesSelector = createSelector(
  productsStateSelector,
  productsState => productsState.categories
);

const productsSelector = createSelector(
  productsStateSelector,
  productsState => productsState.products
);

const isLoadingCategoriesSelector = createSelector(
  productsStateSelector,
  productsState => productsState.fetchingCategories
);

const isLoadingProductsSelector = createSelector(
  productsStateSelector,
  productsState => productsState.fetchingProducts
);

export const isLoadingSelector = createSelector(
  isLoadingCategoriesSelector,
  isLoadingProductsSelector,
  categoriesSelector,
  productsSelector,
  (loadingCategories, loadingProducts, categories, products) => {
    return loadingCategories || loadingProducts || !categories || !products;
  }
);
