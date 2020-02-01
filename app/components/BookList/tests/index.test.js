/**
 *
 * Tests for BookList
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import BookList from '../index';

describe('<BookList />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<BookList />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Expect to return null if no books are passed', () => {
    const {
      container: { firstChild },
    } = render(<BookList books={[]} />);

    expect(firstChild).toBeNull();
  });

  it('Expect each book to be rendered', () => {
    const books = [
      {
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        description:
          'Written more than 70 years ago, 1984 was George Orwell’s chilling prophecy about the future. And while 1984 has come and gone, his dystopian vision of a government that will do anything to control the narrative is timelier than ever...',
      },
      {
        title: 'Dracula',
        author: 'Bram Stoker',
        isbn: '9780486454016',
        description:
          "During a business visit to Count Dracula's castle in Transylvania, a young English solicitor finds himself at the center of a series of horrifying incidents.",
      },
    ];
    const { findByText } = render(<BookList books={books} />);

    books.forEach(({ title }) => expect(findByText(title)));
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<BookList />);
    expect(firstChild).toMatchSnapshot();
  });
});
