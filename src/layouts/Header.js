import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Icon, Menu, Dropdown } from 'antd';

const { Header } = Layout;

class HeaderView extends React.Component {
  render() {
    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <Icon
          className="trigger"
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.toggle}
        />
      </Header>
    );
  }
}

const mapStateToProps = state => ({

})

export default  connect(
  mapStateToProps
)(HeaderView);
