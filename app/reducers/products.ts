import {
  ProductsAction,
  GetCategoriesLoading,
  GetCategoriesDone,
  GetCategoriesError,
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

type Action = GetCategoriesLoading | GetCategoriesDone | GetCategoriesError;

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
    default:
      return state;
  }
};

export default products;
