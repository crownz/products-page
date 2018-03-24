import * as React from 'react';
import { mount } from 'enzyme';

import Category, { Props } from './Category';

describe('Category component', () => {
  it('should render category', () => {
    const driver = getDriver();
    expect(driver.element('category').exists()).toBe(true);
    expect(driver.element('category').text()).toEqual('title');
  });

  it('should render active category', () => {
    const driver = getDriver({ isActive: true });
    expect(driver.element('category').exists()).toBe(false);
    expect(driver.element('active-category').exists()).toBe(true);
  });

  it('should call setActive', () => {
    const setActiveMock = jest.fn();

    const driver = getDriver({
      setActive: setActiveMock,
    });

    driver.element('category').click();
    expect(setActiveMock.mock.calls.length).toBe(1);
  });
});

const getDriver = (props: Partial<Props> = {}) => {
  const wrapper = mount(<Category {...getProps(props)} />);

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
    id: '123',
    isActive: false,
    setActive: () => {},
    ...props,
  };
};
