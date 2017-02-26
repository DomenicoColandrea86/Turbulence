import React from 'react';
import { shallow } from 'enzyme';

import { App } from '../index';
import Header from '../../../components/Header';

function setup() {
  const props = {
    loadUserFromToken: () => {},
    logout: () => {},
  };
  const renderedComponent = shallow(
    <App />
  );

  return {
    props,
    renderedComponent,
  };
}

describe('<App />', () => {
  it('should render the header', () => {
    const { renderedComponent } = setup();
    expect(renderedComponent.find(Header).length).toBe(1);
  });

  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const { renderedComponent } = setup();
    // const renderedComponent = shallow(
    //   <App>
    //     {children}
    //   </App>
    // );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
