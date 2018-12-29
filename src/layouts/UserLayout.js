import React from 'react';
import {
  Layout,
} from 'antd';
import {
  Link,
  withRouter,
} from 'react-router-dom';

import Footer from './Footer';

const { Content } = Layout;

export default class UserLayout extends React.Component {
  render() {
    return (
      <Layout style={{ minHeight: '100%' }}>
        <Content style={{ margin: '24px 16px', padding: 24, position: 'relative' }}>
          {this.props.children}
        </Content>
        <Footer />
      </Layout>
    )
  }
}
