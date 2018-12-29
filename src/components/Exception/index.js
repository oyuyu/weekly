// reference: ant-design-pro
// url: https://github.com/ant-design/ant-design-pro/blob/master/src/components/Exception/index.js

import React from 'react';
import {
  Button,
  Row,
  Col,
} from 'antd';
import styles from './index.less';

import config from './typeConfig.js';

const colSpan = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 12,
}

export default class Exception extends React.Component {
  static defaultProps = {
    backText: '返回首页',
    redirect: '/',
  }

  btnRender = () => {
    const Link = this.props.lineElement;

    if (Link) {
      return (
        <Link to={this.props.redirect}>
          <Button type="primary">{this.props.backText}</Button>
        </Link>
      )
    }
  }

  render() {
    const {
      type,
    } = this.props;

    const pageType = type in config ? type: '404';

    return (
      <div id={styles.exceptionLayout}>
        <Row gutter={this.props.gutter || 24} type='flex' align='middle'>
          <Col {...colSpan}>
            <div className={styles.imgEle} style={{ backgroundImage: `url(${config[pageType].img})` }} />
          </Col>
          <Col {...colSpan}>
            <div className={styles.contentEle}>
              <span className={styles.titleEle}>{config[pageType].title}</span>
              <span className={styles.textEle}>{config[pageType].desc}</span>
              <div className={styles.btnEle}>{this.btnRender()}</div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
