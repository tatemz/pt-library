import Container from '@material-ui/core/Container';
import { push } from 'connected-react-router';
import HomePage from 'containers/HomePage';
import ManagePage from 'containers/ManagePage';
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
import AppNav from '../../components/AppNav';

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
      <AppNav
        handleOnLibraryButtonClick={handleOnLibraryButtonClick}
        handleOnManageButtonClick={handleOnManageButtonClick}
      />
      <main style={{ paddingTop: '6em' }}>
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
