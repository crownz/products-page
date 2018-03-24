import { MockStore } from 'redux-mock-store';
const configureStore = require('redux-mock-store'); // in current typescript/redux-mock-store version, there is a typescript bug. Using require to overcome it.
import thunk from 'redux-thunk';
import * as sinon from 'sinon';

import * as productsAPI from '../services/productsAPI';
import { getProducts, ProductsAction, getCategories, filterActiveProducts } from './products';

let sandbox: sinon.SinonSandbox;
let store: MockStore<{}>;

let getProductsStub: sinon.SinonStub;
let getCategoriesStub: sinon.SinonStub;

const middlewares = [thunk];
const mockStore = (getState: any): MockStore<{}> => configureStore(middlewares)(getState);

describe('products actions', () => {
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    store = mockStore({});
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Get products', () => {
    const mockProductsResponse = {
      data: [
        {
          title: 't1',
          id: 'p1',
          categories: [
            {
              id: 'c1',
              title: 'c1',
            },
            {
              id: 'c2',
              title: 'c2',
            },
          ],
          box_limit: 2,
          other: 'other',
        },
      ],
    };

    beforeEach(() => {
      getProductsStub = sandbox.stub(productsAPI, 'getProducts');
    });

    test('should get correctly mapped products', () => {
      getProductsStub.returns(Promise.resolve(mockProductsResponse));
      return store.dispatch(getProducts()).then(() => {
        const expectedActions = [
          { type: ProductsAction.GET_PRODUCTS_LOADING },
          {
            type: ProductsAction.GET_PRODUCTS_DONE,
            products: [
              {
                title: 't1',
                id: 'p1',
                categoryIds: ['c1', 'c2'],
              },
            ],
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    test('should dispatch error when endpoint reject', () => {
      getProductsStub.rejects(new Error());
      return store.dispatch(getProducts()).then(() => {
        const expectedActions = [
          { type: ProductsAction.GET_PRODUCTS_LOADING },
          { type: ProductsAction.GET_PRODUCTS_ERROR },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    test('should dispatch error when response has incorrect structure', () => {
      getProductsStub.returns(Promise.resolve({}));
      return store.dispatch(getProducts()).then(() => {
        const expectedActions = [
          { type: ProductsAction.GET_PRODUCTS_LOADING },
          { type: ProductsAction.GET_PRODUCTS_ERROR },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('Get categories', () => {
    const mockCategories = {
      data: [
        {
          title: 'c1',
          id: 'c1',
          hidden: true,
          something: 'something',
        },
        {
          title: 'c2',
          id: 'c2',
          hidden: false,
          something: 'something',
        },
      ],
    };

    beforeEach(() => {
      getCategoriesStub = sandbox.stub(productsAPI, 'getCategories');
    });

    test('should get mapped and filtered categories', () => {
      getCategoriesStub.returns(Promise.resolve(mockCategories));
      return store.dispatch(getCategories()).then(() => {
        const expectedActions = [
          { type: ProductsAction.GET_CATEGORIES_LOADING },
          {
            type: ProductsAction.GET_CATEGORIES_DONE,
            categories: [
              {
                title: 'c2',
                id: 'c2',
              },
            ],
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    test('should dispatch error when endpoint reject', () => {
      getCategoriesStub.rejects(new Error());
      return store.dispatch(getCategories()).then(() => {
        const expectedActions = [
          { type: ProductsAction.GET_CATEGORIES_LOADING },
          { type: ProductsAction.GET_CATEGORIES_ERROR },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    test('should dispatch error when response has incorrect structure', () => {
      getCategoriesStub.returns(Promise.resolve({}));
      return store.dispatch(getCategories()).then(() => {
        const expectedActions = [
          { type: ProductsAction.GET_CATEGORIES_LOADING },
          { type: ProductsAction.GET_CATEGORIES_ERROR },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('Filter active products', () => {
    beforeEach(() => {
      const products = [
        {
          id: '1',
          title: 'product1',
          categoryIds: ['c1', 'c2', 'c3'],
          description: 'desc1',
        },
        {
          id: '2',
          title: 'product2',
          categoryIds: ['c2'],
          description: 'desc2',
        },
        {
          id: '3',
          title: 'product3',
          categoryIds: ['c6', 'c7'],
          description: 'desc3',
        },
      ];

      store = mockStore({
        products: {
          products,
        },
      });
    });

    test('should correctly filter based on category 1', () => {
      store.dispatch(filterActiveProducts('c2', ''));
      const expectedActions = [
        {
          type: ProductsAction.SET_FILTERED_PRODUCTS,
          activeProducts: [
            {
              id: '1',
              title: 'product1',
              categoryIds: ['c1', 'c2', 'c3'],
              description: 'desc1',
            },
            {
              id: '2',
              title: 'product2',
              categoryIds: ['c2'],
              description: 'desc2',
            },
          ],
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('should correctly filter based on category 2', () => {
      store.dispatch(filterActiveProducts('c7', ''));
      const expectedActions = [
        {
          type: ProductsAction.SET_FILTERED_PRODUCTS,
          activeProducts: [
            {
              id: '3',
              title: 'product3',
              categoryIds: ['c6', 'c7'],
              description: 'desc3',
            },
          ],
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('should correctly filter based on non existing category', () => {
      store.dispatch(filterActiveProducts('not-existing', ''));
      const expectedActions = [
        {
          type: ProductsAction.SET_FILTERED_PRODUCTS,
          activeProducts: [],
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('should correctly filter based on category and searchString in title', () => {
      store.dispatch(filterActiveProducts('c2', 'ct1'));
      const expectedActions = [
        {
          type: ProductsAction.SET_FILTERED_PRODUCTS,
          activeProducts: [
            {
              id: '1',
              title: 'product1',
              categoryIds: ['c1', 'c2', 'c3'],
              description: 'desc1',
            },
          ],
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('should correctly filter based on category and searchString in description', () => {
      store.dispatch(filterActiveProducts('c2', 'sc1'));
      const expectedActions = [
        {
          type: ProductsAction.SET_FILTERED_PRODUCTS,
          activeProducts: [
            {
              id: '1',
              title: 'product1',
              categoryIds: ['c1', 'c2', 'c3'],
              description: 'desc1',
            },
          ],
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('should correctly filter based on category and incorrect searchString', () => {
      store.dispatch(filterActiveProducts('c2', 'gfeurhguyrhug'));
      const expectedActions = [
        {
          type: ProductsAction.SET_FILTERED_PRODUCTS,
          activeProducts: [],
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
