import React from 'react';
import { render } from 'react-testing-library';
import ErrorMessages from '../index';

describe('<ErrorMessages />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<ErrorMessages />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Expect to return null if no errors are passed', () => {
    const {
      container: { firstChild },
    } = render(<ErrorMessages errors={[]} />);
    expect(firstChild).toBeNull();
  });

  it('Expect each book to be rendered', () => {
    const errors = [Error('Foo'), Error('Bar')];
    const { getByText } = render(<ErrorMessages errors={errors} />);
    errors.forEach(({ message }) => expect(getByText(message)));
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<ErrorMessages />);
    expect(firstChild).toMatchSnapshot();
  });
});
