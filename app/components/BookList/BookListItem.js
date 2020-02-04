import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import {
  CHECK_BOOK_METHOD_IN,
  CHECK_BOOK_METHOD_OUT,
} from '../../containers/HomePage/constants';
import { BOOK_PROP_TYPE } from './constants';

function BookListItem({ book, handleCheckBook, isBeingChecked }) {
  const { title, author, description, isbn } = book;
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography color="textSecondary">{author}</Typography>
        <Typography variant="caption" display="block" gutterBottom>
          {isbn}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          disabled={isBeingChecked}
          onClick={() =>
            !isBeingChecked &&
            handleCheckBook &&
            handleCheckBook(
              book,
              book.checked ? CHECK_BOOK_METHOD_IN : CHECK_BOOK_METHOD_OUT,
            )
          }
        >
          {book.checked ? 'Checkin' : 'Checkout'}
        </Button>
      </CardActions>
    </Card>
  );
}

BookListItem.propTypes = {
  book: BOOK_PROP_TYPE,
  handleCheckBook: PropTypes.func,
  isBeingChecked: PropTypes.bool,
};

export default BookListItem;
