import React, { Fragment } from 'react';
import {
  HashRouter,
  Route,
  IndexRoute,
  Switch,
  Redirect
} from 'react-router-dom';

import BasicLayout from './layouts/BasicLayout';

import config from './common/config';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <HashRouter basename='/'>
        <BasicLayout>
          <Switch>
            {
              config.map(value => (<Route path={value.path} key={value.path} exact component={value.component} />))
            }
          </Switch>
        </BasicLayout>
      </HashRouter>
    );
  }
}
