import React from 'react';
import {
  Row,
  Col,
} from 'antd';

export default function Line (props) {
  return (
    <Row gutter={props.gutter || 0} align={'middle'} type={'flex'} style={{ marginBottom: 15}}>
      <Col span={props.labelCol || 12} style={{ textAlign: props.align || 'left' }}>
        <span>{props.label}</span>
      </Col>
      <Col span={props.wrapperCol || 12}>
        {props.children}
      </Col>
    </Row>
  )
}
