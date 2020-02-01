import PropTypes from 'prop-types';

export const BOOK_PROP_TYPE = PropTypes.shape({
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  isbn: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
});

export const BOOK_LIST_PROP_TYPE = PropTypes.arrayOf(BOOK_PROP_TYPE);
