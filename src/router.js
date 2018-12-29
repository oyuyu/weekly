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
import UserLayout from './layouts/UserLayout';
import Authorized from './components/Authorized';

import {setAuthority, getAuthority} from './utils/authority';
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

  const LayoutComponent = ({children}) => {
    const auth = getAuthority();
    if (auth.length === 0) {
      return (
        <UserLayout>
          {children}
        </UserLayout>
      )
    } else {
      return (
        <BasicLayout>
          {children}
        </BasicLayout>
      )
    }
  }

  return (
    <Router history={history}>
      <LayoutComponent>
        <Suspense fallback={<Loading />}>
          <Authorized config={config} path={['/home', '/login']} />
        </Suspense>
      </LayoutComponent>
    </Router>
  )
}
