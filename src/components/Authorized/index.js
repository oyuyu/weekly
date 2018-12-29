import React, {Fragment} from 'react';
import {
  Route,
  IndexRoute,
  Switch,
  Redirect,
  Link,
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Exception from '../Exception';

import {setAuthority, getAuthority} from '../../utils/authority';

const matchRule = (arr, ary) => {
  if (arr.length === 0 ) return true;
  return arr.some(value => {
    return ary.some(val => {
      return val == value;
    })
  })
};

export default class Authorized extends React.Component {

  routeRender = auth => {
    const { config } = this.props;

    return (
      config.map(value => {
        if (value.children) {
          const role = value.role;
          return value.children.map(value => {
            return (
              <PrivateRoute
                exact
                key={value.path}
                path={value.path.toString()}
                auth={matchRule(role, auth)}
                component={value.component}
              />
            )
          })
        } else {
          return (
            <PrivateRoute
              exact
              key={value.path}
              path={value.path.toString()}
              auth={matchRule(value.role, auth)}
              component={value.component}
            />
          )
        }
      })
    )
  }

  render() {
    const auth = getAuthority();
    return (
      <Switch>
        <Route exact path="/" render={() => (
          auth.length !== 0 ? (
            <Redirect to={this.props.path[0]} />
          ) : (
            <Redirect to={this.props.path[1]} />
          )
        )}/>
        {this.routeRender(auth)}
        <Route component={() => <Exception type={'404'} lineElement={Link} />} />
      </Switch>
    )
  }
}
