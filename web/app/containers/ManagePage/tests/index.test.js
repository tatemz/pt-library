import React from 'react';
import { render } from 'react-testing-library';
import { browserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../../../configureStore';
import { ManagePage } from '../index';

describe('<ManagePage />', () => {
  let store;

  const renderComponent = props =>
    render(
      <Provider store={store}>
        <ManagePage {...props} />
      </Provider>,
    );
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    renderComponent();
    expect(spy).not.toHaveBeenCalled();
  });

  it.skip('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(false);
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = renderComponent();
    expect(firstChild).toMatchSnapshot();
  });
});
