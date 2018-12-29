import React, { Fragment } from 'react';
import {
  Route,
  IndexRoute,
  Switch,
  Redirect,
  Link,
} from 'react-router-dom';

import Exception from '../Exception';

const PrivateRoute = ({
  auth,
  component: Component,
  ...rest,
}) => (
  <Route
    {...rest}
    render={props =>
      auth ? (
        <Component {...props} />
      ) : (
        <Exception type={'403'} lineElement={Link} />
      )
    }
  />
)

export default PrivateRoute;
