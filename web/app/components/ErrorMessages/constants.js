import PropTypes from 'prop-types';

export const ERROR_LIST_PROP_TYPE = PropTypes.arrayOf(
  PropTypes.objectOf(Error),
);
