import React from 'react';
import { render } from 'react-testing-library';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import BookList from '../index';

describe('<BookList />', () => {
  const books = [
    {
      title: '1984',
      author: 'George Orwell',
      isbn: '9780451524935',
      description:
        'Written more than 70 years ago, 1984 was George Orwell’s chilling prophecy about the future. And while 1984 has come and gone, his dystopian vision of a government that will do anything to control the narrative is timelier than ever...',
      checked: false,
    },
    {
      title: 'Dracula',
      author: 'Bram Stoker',
      isbn: '9780486454016',
      description:
        "During a business visit to Count Dracula's castle in Transylvania, a young English solicitor finds himself at the center of a series of horrifying incidents.",
      checked: true,
    },
  ];

  it('should log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<BookList />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should return null if no books are passed', () => {
    const {
      container: { firstChild },
    } = render(<BookList books={[]} />);

    expect(firstChild).toBeNull();
  });

  it('should render each book', () => {
    const { findByText } = render(<BookList books={books} />);

    books.forEach(({ title }) => expect(findByText(title)));
  });

  it('should pass isBeingChecked to each book', () => {
    const checkBookQueue = [{ book: books[0] }];
    const { getByText } = render(
      <BookList books={[books[0]]} checkBookQueue={checkBookQueue} />,
    );
    const buttonSpan = getByText('Checkout');
    expect(buttonSpan.parentElement.disabled).toBeTruthy();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<BookList />);
    expect(firstChild).toMatchSnapshot();
  });
});
