import * as React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('App component', () => {
  it('should render app', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('[data-hook="app-container"]').exists()).toBe(true);
  });
});
