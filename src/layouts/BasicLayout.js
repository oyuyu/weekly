import React from 'react';
import {
  Layout,
  Menu,
  Icon,
  Breadcrumb,
} from 'antd';
import {
  Link,
  withRouter,
} from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import logo from '../assets/logo.svg';

// import './index.less';
import styles from './index.less';

import config from '../common/config';

const { Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

class BasicLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  siderRender = list => {
    const { match, location, history } = this.props;

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
      >
        <Link to='/'><div id={styles.logoLayout}><div className={styles.logo} style={{ backgroundImage: `url(${logo})` }} /></div></Link>
        <Menu theme="dark" mode="inline" defaultOpenKeys={[]} selectedKeys={[location.pathname]}>
          {
            list.map((value, index) => {
              if (value.icon) {
                if (value.children) {
                  return (
                    <SubMenu
                       key={value.path}
                       title={<span><Icon type={value.icon} /><span>{value.name}</span></span>}
                    >
                      {value.children.map(value => (
                        <Menu.Item key={value.path}>
                          <Link to={`${value.path}`}>{value.name}</Link>
                        </Menu.Item>
                      ))}
                    </SubMenu>
                  );
                } else {
                  return (
                    <Menu.Item key={value.path}>
                      <Link to={`${value.path}`}>
                        <Icon type={value.icon} />
                        <span>{value.name}</span>
                      </Link>
                    </Menu.Item>
                  );
                }
              }
            })
          }
        </Menu>
      </Sider>
    );
  }

  render() {
    return (
      <Layout id={styles.layout}  style={{ minHeight: '100%' }}>
        {this.siderRender(config)}
        <Layout>
          <Header collapsed={this.state.collapsed} toggle={this.toggle} />
          <Content style={{ margin: '24px 16px', padding: 24 }}>
            {this.props.children}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(BasicLayout);
