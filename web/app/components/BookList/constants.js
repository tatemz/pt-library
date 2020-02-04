import PropTypes from 'prop-types';
import {
  CHECK_BOOK_METHOD_IN,
  CHECK_BOOK_METHOD_OUT,
} from '../../containers/HomePage/constants';

export const BOOK_PROP_TYPE = PropTypes.shape({
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  isbn: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
});

export const BOOK_LIST_PROP_TYPE = PropTypes.arrayOf(BOOK_PROP_TYPE);

export const CHECK_BOOK_QUEUE_PROP_TYPE = PropTypes.arrayOf(
  PropTypes.shape({
    book: BOOK_PROP_TYPE,
    method: PropTypes.oneOf([CHECK_BOOK_METHOD_IN, CHECK_BOOK_METHOD_OUT]),
  }),
);
