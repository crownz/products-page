import * as React from 'react';
import { mount } from 'enzyme';

import { App, AppProps } from './App';

describe('App component', () => {
  it('should render app', () => {
    const driver = getDriver();
    expect(driver.element('app-container').exists()).toBe(true);
  });

  it('should render categories title', () => {
    const driver = getDriver();
    expect(driver.element('categories-title').text()).toEqual('Store Cupboard');
  });

  it('should render no categories', () => {
    const driver = getDriver();
    expect(
      driver
        .element('categories-container')
        .childrent()
        .count()
    ).toEqual(1);
  });

  it('should render 1 category', () => {
    const driver = getDriver({ categories: [{ id: '1', title: 't' }] });
    expect(
      driver
        .element('categories-container')
        .childrent()
        .count()
    ).toEqual(2);
  });

  it('should render filter input', () => {
    const driver = getDriver();
    expect(driver.element('filter-input').exists()).toBe(true);
  });

  it('should render no products', () => {
    const driver = getDriver();
    expect(
      driver
        .element('products-container')
        .childrent()
        .count()
    ).toEqual(0);
  });

  it('should render 2 products', () => {
    const driver = getDriver({
      activeProducts: [
        { id: '1', title: 't1', description: 'desc1', categoryIds: [] },
        { id: '2', title: 't2', description: 'desc2', categoryIds: [] },
      ],
    });
    expect(
      driver
        .element('products-container')
        .childrent()
        .count()
    ).toEqual(2);
  });

  it('should call filter on mount', () => {
    const filterActiveProductsMock = jest.fn();

    const driver = getDriver({
      activeProducts: [
        { id: '1', title: 't1', description: 'desc1', categoryIds: [] },
        { id: '2', title: 't2', description: 'desc2', categoryIds: [] },
      ],
      filterActiveProducts: filterActiveProductsMock,
    });

    expect(filterActiveProductsMock.mock.calls.length).toBe(1);
  });
});

const getDriver = (props: Partial<AppProps> = {}) => {
  const wrapper = mount(<App {...getProps(props)} />);

  return {
    element: (hook: string) => {
      const el = wrapper.find(`[data-hook="${hook}"]`);
      return {
        exists: () => el.exists(),
        text: () => el.text(),
        childrent: () => {
          const childs = el.children();
          return {
            count: () => childs.length,
            at: (idx: number) => childs.at(idx),
          };
        },
      };
    },
  };
};

const getProps = (props: Partial<AppProps> = {}): AppProps => {
  return {
    categories: [],
    activeProducts: [],
    filterActiveProducts: (category: string, fitler: string) => {},
    activeCategoryId: '123',
    history: {
      push: (url: string) => {},
    },
    ...props,
  };
};
