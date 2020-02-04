/* eslint-disable react/no-array-index-key */
import React from 'react';
import { ERROR_LIST_PROP_TYPE } from './constants';

function ErrorMessages({ errors }) {
  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <ul>
      {errors.map(({ message }, i) => (
        <li key={`error-message-${i}`}>{message}</li>
      ))}
    </ul>
  );
}

ErrorMessages.defaultProps = {
  errors: [],
};

ErrorMessages.propTypes = {
  errors: ERROR_LIST_PROP_TYPE,
};

export default ErrorMessages;
