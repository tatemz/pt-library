import { push } from 'connected-react-router';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import App, { mapDispatchToProps } from '../index';

const renderer = new ShallowRenderer();

describe('<App />', () => {
  it.skip('should render and match the snapshot', () => {
    renderer.render(<App />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });

  describe('mapDispatchToProps', () => {
    it('should inject handleOnLibraryButtonClick and dispatch when called', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      result.handleOnLibraryButtonClick();
      expect(dispatch).toHaveBeenCalledWith(push('/'));
    });

    it('should inject handleOnManageButtonClick and dispatch when called', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      const book = 'Foo';
      result.handleOnManageButtonClick(book);
      expect(dispatch).toHaveBeenCalledWith(push('/manage'));
    });
  });
});
