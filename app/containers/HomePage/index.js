/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import BookList from '../../components/BookList';
import { BOOK_LIST_PROP_TYPE } from '../../components/BookList/constants';

export default function HomePage({ books }) {
  return <BookList books={books} />;
}

HomePage.defaultProps = {
  books: [
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
  ],
};

HomePage.propTypes = {
  books: BOOK_LIST_PROP_TYPE,
};
