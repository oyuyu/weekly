import React, {Fragment} from 'react';
import {
  Card,
  Icon,
} from 'antd';
import styles from './index.less';

const number = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十'];

export default function GeneralItem (props) {
  return (
    <Card
      headStyle={{
        fontWeight: 'bold',
        padding: '0 16px',
        margin: '0',
      }}
      title={
        <Fragment>
          <span className={styles.titleIcon}><Icon type="disconnect" /></span>{number[props.index]}、{props.title}
        </Fragment>
      }
      style={{
        width: '100%',
        background: '#FBFBFB',
        margin: '8px 0',
        padding: '0 16px',
        borderRadius: '5px',
      }}
    >
      {props.children}
    </Card>
  )
}
