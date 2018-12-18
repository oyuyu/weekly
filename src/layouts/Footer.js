import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';

const { Footer } = Layout;

const FooterView = () => (
  <Footer style={{ padding: '0 20px', marginBottom: '20px', textAlign: 'center' }}>
    <p>Copyright <Icon type="copyright" /> 2018</p>
  </Footer>
);
export default FooterView;
