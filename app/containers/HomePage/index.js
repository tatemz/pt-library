/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import BookList from '../../components/BookList';
import { BOOK_LIST_PROP_TYPE } from '../../components/BookList/constants';
import { HOME_PAGE_KEY } from './constants';
import reducer from './reducer';
import { loadLibrary as loadLibraryAction } from './actions';

export function HomePage({ loading, error, books, loadLibrary }) {
  useInjectReducer({ key: HOME_PAGE_KEY, reducer });

  useEffect(() => {
    if (loadLibrary) loadLibrary();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>There was an error loading the library.</p>;
  }

  return <BookList books={books} />;
}

HomePage.defaultProps = {
  loading: false,
  error: null,
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
  loadLibrary: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.objectOf(Error),
  books: BOOK_LIST_PROP_TYPE,
};

export function mapDispatchToProps(dispatch) {
  return {
    loadLibrary: () => dispatch(loadLibraryAction()),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
