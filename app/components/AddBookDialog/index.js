import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddBookDialog({ open, handleClose, handleSubmit }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Book to Library</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="isbn"
          label="ISBN"
          type="text"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="author"
          label="Author"
          type="text"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add to library
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddBookDialog.defaultProps = {
  open: false,
};

AddBookDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
};
