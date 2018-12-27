import React, { Fragment, Suspense } from 'react';
// import {
//   HashRouter,
//   Route,
//   IndexRoute,
//   Switch,
//   Redirect
// } from 'react-router-dom';
import { Router, Route, Switch } from 'dva/router';
import Loading from './components/Loading';

import BasicLayout from './layouts/BasicLayout';

import config from './common/config';

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//
//   render () {
//     return (
//       <HashRouter basename='/'>
//         <BasicLayout>
//           <Suspense fallback={<Loading />}>
//             <Switch>
//               {
//                 config.map(value => (
//                   <Route
//                     path={value.path}
//                     key={value.path}
//                     exact
//                     component={value.component}
//                   />
//                 ))
//               }
//             </Switch>
//           </Suspense>
//         </BasicLayout>
//       </HashRouter>
//     );
//   }
// }

export default function App ({ history }) {
  return (
    <Router history={history}>
      <BasicLayout>
        <Suspense fallback={<Loading />}>
          <Switch>
            {
              config.map(value => (
                <Route
                  path={value.path}
                  key={value.path}
                  exact
                  component={value.component}
                />
              ))
            }
          </Switch>
        </Suspense>
      </BasicLayout>
    </Router>
  )
}
