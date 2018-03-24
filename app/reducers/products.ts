import {
  ProductsAction,
  GetCategoriesLoading,
  GetCategoriesDone,
  GetCategoriesError,
  GetProductsDone,
  GetProductsError,
  GetProductsLoading,
  SetFilteredProducts,
} from '../actions/products';

export interface ProductsState {
  categories: Category[];
  products: Product[];
  activeProducts: Product[];
  fetchingCategories: boolean;
  fetchingProducts: boolean;
}

const initialState: ProductsState = {
  categories: null,
  products: null,
  activeProducts: [],
  fetchingCategories: false,
  fetchingProducts: false,
};

type Action =
  | GetCategoriesLoading
  | GetCategoriesDone
  | GetCategoriesError
  | GetProductsLoading
  | GetProductsError
  | GetProductsDone
  | SetFilteredProducts;

const products = (state: ProductsState = initialState, action: Action) => {
  switch (action.type) {
    case ProductsAction.GET_CATEGORIES_LOADING:
      return {
        ...state,
        fetchingCategories: true,
      };
    case ProductsAction.GET_CATEGORIES_ERROR:
      return {
        ...state,
        fetchingCategories: false,
        categories: [],
      };
    case ProductsAction.GET_CATEGORIES_DONE:
      return {
        ...state,
        fetchingCategories: false,
        categories: action.categories,
      };
    case ProductsAction.GET_PRODUCTS_LOADING:
      return {
        ...state,
        fetchingProducts: true,
      };
    case ProductsAction.GET_PRODUCTS_ERROR:
      return {
        ...state,
        fetchingProducts: false,
        products: [],
      };
    case ProductsAction.GET_PRODUCTS_DONE:
      return {
        ...state,
        fetchingProducts: false,
        products: action.products,
      };
    case ProductsAction.SET_FILTERED_PRODUCTS:
      return {
        ...state,
        activeProducts: action.activeProducts,
      };
    default:
      return state;
  }
};

export default products;
