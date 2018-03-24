import { PRODUCT_CATEGORIES_V2 } from '../constants/endpoints';

export enum ProductsAction {
  GET_CATEGORIES_LOADING = 'GET_CATEGORIES_LOADING',
  GET_CATEGORIES_DONE = 'GET_CATEGORIES_DONE',
  GET_CATEGORIES_ERROR = 'GET_CATEGORIES_ERROR',
}

export interface GetCategoriesLoading {
  type: ProductsAction.GET_CATEGORIES_LOADING;
}

export const getCategoriesLoading = (): GetCategoriesLoading => {
  return {
    type: ProductsAction.GET_CATEGORIES_LOADING,
  };
};

export interface GetCategoriesError {
  type: ProductsAction.GET_CATEGORIES_ERROR;
}

export const getCategoriesError = (): GetCategoriesError => {
  return {
    type: ProductsAction.GET_CATEGORIES_ERROR,
  };
};

export interface GetCategoriesDone {
  type: ProductsAction.GET_CATEGORIES_DONE;
  categories: Category[];
}

export const getCategoriesDone = (categories: Category[]): GetCategoriesDone => {
  return {
    categories,
    type: ProductsAction.GET_CATEGORIES_DONE,
  };
};

export const getCategories = () => {
  return dispatch => {
    dispatch(getCategoriesLoading());
    fetch(PRODUCT_CATEGORIES_V2, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(response => {
        const categories: Category[] = response.data
          .filter(category => !category.hidden)
          .map(category => ({
            id: category.id,
            title: category.title,
          }));
        dispatch(getCategoriesDone(categories));
      })
      .catch(err => dispatch(getCategoriesError()));
  };
};
