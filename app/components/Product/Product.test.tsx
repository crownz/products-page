import * as React from 'react';
import { mount } from 'enzyme';

import Product, { Props } from './Product';

describe('Product component', () => {
  it('should render product', () => {
    const driver = getDriver();
    expect(driver.element('product').exists()).toBe(true);
  });

  it('should render product title', () => {
    const driver = getDriver();
    expect(driver.element('product-title').text()).toEqual('title');
  });

  it('should render description when active', () => {
    const driver = getDriver();
    expect(driver.element('product-description').exists()).toBe(false);
    driver.element('product-title').click();
    expect(driver.element('product-description').exists()).toBe(true);
  });
});

const getDriver = (props: Partial<Props> = {}) => {
  const wrapper = mount(<Product {...getProps(props)} />);

  return {
    element: (hook: string) => {
      const el = wrapper.find(`[data-hook="${hook}"]`);
      return {
        exists: () => el.exists(),
        text: () => el.text(),
        click: () => el.simulate('click'),
      };
    },
  };
};

const getProps = (props: Partial<Props> = {}): Props => {
  return {
    title: 'title',
    description: 'description',
    ...props,
  };
};
