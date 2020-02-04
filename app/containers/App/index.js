/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { push } from 'connected-react-router';
import HomePage from 'containers/HomePage/Loadable';
import ManagePage from 'containers/ManagePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import GlobalStyle from '../../global-styles';
import { loadLibrary as loadLibraryAction } from './actions';
import { APP_KEY } from './constants';
import reducer from './reducer';
import saga from './saga';

export function App({
  loadLibrary,
  handleOnLibraryButtonClick,
  handleOnManageButtonClick,
}) {
  useInjectReducer({ key: APP_KEY, reducer });
  useInjectSaga({ key: APP_KEY, saga });

  useEffect(() => {
    if (loadLibrary) loadLibrary();
  }, []);
  return (
    <div>
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
      <main>
        <Container>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/manage" component={ManagePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Container>
      </main>
      <GlobalStyle />
    </div>
  );
}

App.propTypes = {
  loadLibrary: PropTypes.func,
  handleOnLibraryButtonClick: PropTypes.func,
  handleOnManageButtonClick: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    loadLibrary: () => dispatch(loadLibraryAction()),
    handleOnLibraryButtonClick: () => dispatch(push('/')),
    handleOnManageButtonClick: () => dispatch(push('/manage')),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(App);
