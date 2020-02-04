import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import AppNav from '../index';

describe('<AppNav />', () => {
  const renderComponent = props => render(<AppNav {...props} />);

  it('should to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    renderComponent();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should handle nav click events', () => {
    const handleOnLibraryButtonClick = jest.fn();
    const handleOnManageButtonClick = jest.fn();
    const { getByText } = renderComponent({
      handleOnLibraryButtonClick,
      handleOnManageButtonClick,
    });
    const clickAndAssert = (text, method) => {
      const button = getByText(text);
      fireEvent.click(button.parentElement);
      expect(method).toHaveBeenCalled();
    };
    clickAndAssert('Library', handleOnLibraryButtonClick);
    clickAndAssert('Manage', handleOnManageButtonClick);
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = renderComponent();
    expect(firstChild).toMatchSnapshot();
  });
});
