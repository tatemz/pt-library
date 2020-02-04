import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function AppNav({ handleOnLibraryButtonClick, handleOnManageButtonClick }) {
  return (
    <AppBar position="relative">
      <Container>
        <Toolbar>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            style={{ flexGrow: 1 }}
          >
            PT Library
          </Typography>
          <Button
            color="inherit"
            onClick={() =>
              handleOnLibraryButtonClick && handleOnLibraryButtonClick()
            }
          >
            Library
          </Button>
          <Button
            color="inherit"
            onClick={() =>
              handleOnManageButtonClick && handleOnManageButtonClick()
            }
          >
            Manage
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

AppNav.propTypes = {
  handleOnLibraryButtonClick: PropTypes.func,
  handleOnManageButtonClick: PropTypes.func,
};

export default AppNav;
