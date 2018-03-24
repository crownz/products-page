import { PRODUCT_CATEGORIES_V2, PRODUCT_LIST_v2 } from '../constants/endpoints';
import { productsSelector } from '../selectors/products';

export enum ProductsAction {
  GET_CATEGORIES_LOADING = 'GET_CATEGORIES_LOADING',
  GET_CATEGORIES_DONE = 'GET_CATEGORIES_DONE',
  GET_CATEGORIES_ERROR = 'GET_CATEGORIES_ERROR',
  GET_PRODUCTS_LOADING = 'GET_PRODUCTS_LOADING',
  GET_PRODUCTS_DONE = 'GET_PRODUCTS_DONE',
  GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR',
  SET_FILTERED_PRODUCTS = 'SET_FILTERED_PRODUCTS',
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

export interface GetProductsLoading {
  type: ProductsAction.GET_PRODUCTS_LOADING;
}

export const getProductsLoading = (): GetProductsLoading => {
  return {
    type: ProductsAction.GET_PRODUCTS_LOADING,
  };
};

export interface GetProductsError {
  type: ProductsAction.GET_PRODUCTS_ERROR;
}

export const getProductsError = (): GetProductsError => {
  return {
    type: ProductsAction.GET_PRODUCTS_ERROR,
  };
};

export interface GetProductsDone {
  type: ProductsAction.GET_PRODUCTS_DONE;
  products: Product[];
}

export const getProductsDone = (products: Product[]): GetProductsDone => {
  return {
    products,
    type: ProductsAction.GET_PRODUCTS_DONE,
  };
};

export const getProducts = () => {
  return dispatch => {
    dispatch(getProductsLoading());
    fetch(PRODUCT_LIST_v2, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(response => {
        const products: Product[] = response.data.map(product => ({
          id: product.id,
          title: product.title,
          description: product.description,
          categoryIds: product.categories.map(category => category.id),
        }));
        dispatch(getProductsDone(products));
      })
      .catch(err => dispatch(getProductsError()));
  };
};

export interface SetFilteredProducts {
  type: ProductsAction.SET_FILTERED_PRODUCTS;
  activeProducts: Product[];
}

export const setFilteredProducts = (activeProducts: Product[]): SetFilteredProducts => {
  return {
    activeProducts,
    type: ProductsAction.SET_FILTERED_PRODUCTS,
  };
};

export const filterActiveProducts = (category: string, searchString: string) => {
  return (dispatch, getState) => {
    const products = productsSelector(getState());
    let filtered = products.filter(product => product.categoryIds.includes(category));
    if (searchString) {
      filtered = filtered.filter(
        product =>
          product.title.toLowerCase().includes(searchString.toLowerCase()) ||
          product.description.toLowerCase().includes(searchString.toLowerCase())
      );
    }
    dispatch(setFilteredProducts(filtered));
  };
};
