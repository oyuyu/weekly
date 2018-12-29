import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';

const { Footer } = Layout;

const FooterView = () => (
  <Footer style={{ padding: '0 20px', marginBottom: '20px', textAlign: 'center' }}>
    <p>Copyright 2018 <Icon type="copyright" /> weimob 微盟 | Weekly</p>
  </Footer>
);
export default FooterView;
