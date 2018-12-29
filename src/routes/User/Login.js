import React from 'react';
import {
  Form,
  Icon, Input, Button, Checkbox,
} from 'antd';
import { connect } from 'dva';
import styles from './index.less';

@Form.create()
@connect(state => ({
  currentUser: state.user,
}))
export default class Login extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.props.dispatch({
          type: 'user/userLogin',
          payload: {
            ...values
          }
        })
      }
    });
  }

  renderForm = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('ldapName', {
            rules: [{ required: true, message: '请输入LDAP账号' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入LDAP账号" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入LDAP密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入LDAP密码" />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.btn}>
            <Icon type="arrow-right" />
          </Button>
        </Form.Item>
      </Form>
    )
  }

  render() {
    return(
      <div id={styles.userLayout}>
        <p className={styles.title}>Weekly</p>
        {this.renderForm()}
      </div>
    )
  }
}
