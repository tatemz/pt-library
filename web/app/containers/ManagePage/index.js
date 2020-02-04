/**
 *
 * ManagePage
 *
 */

import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { BOOK_LIST_PROP_TYPE } from '../../components/BookList/constants';
import { loadLibrary as loadLibraryAction } from '../App/actions';
import {
  makeSelectLibraryBooks,
  makeSelectLibraryLoading,
} from '../App/selectors';
import { addBook, deleteBook, updateBook } from './actions';
import { MANAGE_PAGE_KEY } from './constants';
import reducer from './reducer';
import saga from './saga';

export function ManagePage({
  libraryLoading,
  loadLibrary,
  libraryBooks,
  handleOnBookAdd,
  handleOnBookUpdate,
  handleOnBookDelete,
}) {
  useInjectReducer({ key: MANAGE_PAGE_KEY, reducer });
  useInjectSaga({ key: MANAGE_PAGE_KEY, saga });

  useEffect(() => {
    if (loadLibrary) loadLibrary();
  }, []);

  const noWrap = { whiteSpace: 'nowrap' };
  return (
    <MaterialTable
      title="Library Manager"
      columns={[
        {
          cellStyle: noWrap,
          title: 'ISBN',
          field: 'isbn',
          editable: 'onAdd',
        },
        { cellStyle: noWrap, title: 'Title', field: 'title' },
        { cellStyle: noWrap, title: 'Author', field: 'author' },
        {
          title: 'Description',
          field: 'description',
        },
        {
          title: 'Checked Out',
          field: 'checked',
          type: 'boolean',
        },
      ]}
      data={libraryBooks || []}
      isLoading={libraryLoading}
      editable={{
        onRowAdd: async book => handleOnBookAdd(book),
        onRowUpdate: async book => handleOnBookUpdate(book),
        onRowDelete: async book => handleOnBookDelete(book),
      }}
    />
  );
}

ManagePage.propTypes = {
  libraryLoading: PropTypes.bool,
  libraryBooks: BOOK_LIST_PROP_TYPE,
  loadLibrary: PropTypes.func,
  handleOnBookDelete: PropTypes.func,
  handleOnBookAdd: PropTypes.func,
  handleOnBookUpdate: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  libraryBooks: makeSelectLibraryBooks(),
  libraryLoading: makeSelectLibraryLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadLibrary: () => dispatch(loadLibraryAction()),
    handleOnBookAdd: book => dispatch(addBook(book)),
    handleOnBookUpdate: book => dispatch(updateBook(book)),
    handleOnBookDelete: book => dispatch(deleteBook(book)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ManagePage);
