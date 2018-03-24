import { PRODUCT_LIST_v2, PRODUCT_CATEGORIES_V2 } from '../constants/endpoints';

export const getProducts = () => {
  return fetch(PRODUCT_LIST_v2, {
    method: 'GET',
  }).then(response => response.json());
};

export const getCategories = () => {
  return fetch(PRODUCT_CATEGORIES_V2, {
    method: 'GET',
  }).then(response => response.json());
};
