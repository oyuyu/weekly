import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Layout, Icon, Menu, Dropdown } from 'antd';
import styles from './header.less';

import {setAuthority, getAuthority} from '../utils/authority';

const { Header } = Layout;

@connect(state => ({
  currentUser: state.user,
}))
export default class HeaderView extends React.Component {

  componentDidMount() {
    if (Object.keys(this.props.currentUser.userInfo).length === 0) {
      this.props.dispatch({
        type: 'user/userInfo',
      })
    }
  }

  userLogout = () => {
    this.props.dispatch({
      type: 'user/userLogout',
    })
  }

  menuRender = () => {
    return (
      <Menu>
        <Menu.Item>
          <a onClick={this.userLogout}>退出登录</a>
        </Menu.Item>
      </Menu>
    )
  }

  render() {
    return (
      <Header id={styles.header}>
        <Icon
          className={styles.trigger}
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.toggle}
        />
        <div className={styles.user}>
          <Dropdown overlay={this.menuRender()} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
              {this.props.currentUser.userInfo.userName} <Icon type="down" />
            </a>
          </Dropdown>
        </div>
      </Header>
    );
  }
}
