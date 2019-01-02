import React, {Fragment} from 'react';
import {
  message,
  Row,
  Col,
  Select,
  Button,
  Skeleton,
  Card,
  Icon,
} from 'antd';
import { connect } from 'dva';
import styles from './index.less';

const Option = Select.Option;
const fullWidth = { width: '100%' };
const number = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十'];

@connect(state => ({
  currentUser: state.user,
  okr: state.okr,
}))
export default class Okr extends React.Component {
  constructor(props) {
    super(props);

    const now = new Date();

    this.state = {
      limit: {
        year: now.getFullYear(),
        quarter: parseInt(now.getMonth() / 3) + 1,
      },
      yearSelectValue: now.getFullYear(),
      quarterSelectValue: parseInt(now.getMonth() / 3) + 1,
    }
  }

  componentDidMount() {
    const {
      yearSelectValue,
      quarterSelectValue,
    } = this.state;

    this.props.dispatch({
      type: 'okr/getOkrDetail',
      payload: {
        year: yearSelectValue,
        qtype: quarterSelectValue,
        // userId: this.props.currentUser.userInfo.userId,
        userId: null,
        krId: null,
      }
    })
  }

  stateHandler = (value, key) => {
    let state = this.state;
    state[key] = value;
    this.setState({
      ...state,
    });

    if (state.yearSelectValue < state.limit.year || (state.yearSelectValue = state.limit.year && state.quarterSelectValue <= state.limit.quarter)) {
      this.props.dispatch({
        type: 'okr/getOkrDetail',
        payload: {
          year: +state.yearSelectValue,
          qtype: +state.quarterSelectValue,
          // userId: this.props.currentUser.userInfo.userId,
          userId: null,
          krId: null,
        }
      })
    } else {
      message.error('不能选择未到的季度！')
    }
  }

  yearSelectRender = locked => {
    const year = this.state.yearSelectValue;
    const limit = this.state.limit;

    return (
      <Select
        value={year}
        style={fullWidth}
        onChange={value => { this.stateHandler(value, 'yearSelectValue') }}
        disabled={locked}
      >
        <Option value={limit.year - 1}>{limit.year - 1}</Option>
        <Option value={limit.year}>{limit.year}</Option>
        <Option value={limit.year + 1} disabled>{limit.year + 1}</Option>
        <Option value={limit.year + 2} disabled>{limit.year + 2}</Option>
      </Select>
    )
  }

  quarterSelectRender = locked => {
    const year = this.state.yearSelectValue, quarter = this.state.quarterSelectValue;
    const limit = this.state.limit;

    return (
      <Select
        value={quarter}
        style={fullWidth}
        onChange={value => { this.stateHandler(value, 'quarterSelectValue') }}
        disabled={locked}
      >
        <Option value={1} disabled={year == limit.year && limit.quarter < 1}>Q1</Option>
        <Option value={2} disabled={year == limit.year && limit.quarter < 2}>Q2</Option>
        <Option value={3} disabled={year == limit.year && limit.quarter < 3}>Q3</Option>
        <Option value={4} disabled={year == limit.year && limit.quarter < 4}>Q4</Option>
      </Select>
    )
  }

  selectRender = locked => {
    return (
      <Row gutter={16} type={'flex'} align={'middle'}>
        <Col span={6}>
          {this.yearSelectRender(locked)}
        </Col>
        <Col span={6}>
          {this.quarterSelectRender(locked)}
        </Col>
        <Col span={12}>
          {this.props.currentUser.userInfo.userName}的OKR
        </Col>
      </Row>
    )
  }

  detailRender = () => {
    const { okrInfo } = this.props.okr;

    return (
      <div style={{ marginTop: 24 }}>
        {
          Object.keys(okrInfo).length === 0 && (
            <Skeleton />
          )
        }
        {
          Object.keys(okrInfo).length !== 0 && okrInfo.okrDetails && (
            <Fragment>
              {
                okrInfo.okrDetails.map((value, index) => (
                  <Card
                    headStyle={{
                      fontWeight: 'bold',
                      padding: '0 16px',
                      margin: '0',
                    }}
                    title={
                      <Fragment>
                        <span className={styles.titleIcon}><Icon type="disconnect" /></span>{number[index]}、{value.odetail}
                      </Fragment>
                    }
                    style={{
                      ...fullWidth,
                      background: '#FBFBFB',
                      margin: '8px 0',
                      padding: '0 16px',
                      borderRadius: '5px',
                    }}
                    key={value.oid}
                  >
                    {
                      value.krs.map(value => (
                        <p>{value.krDetail}</p>
                      ))
                    }
                  </Card>
                ))
              }
            </Fragment>
          )
        }
        {
          Object.keys(okrInfo).length !== 0 && !okrInfo.okrDetails && (
            <div style={{ textAlign: 'center', marginTop: 64 }}>
              <p>你还未设定这个Q的OKR，是否新建？</p>
              <Button type='primary'>新建OKR</Button>
            </div>
          )
        }
      </div>
    )
  }

  optionRender = locked => {
    if (!locked) return void(0);

    return (
      <div className={styles.option}>
        <Button>保存</Button>
        <Button>返回</Button>
        <Button>编辑</Button>
      </div>
    )
  }

  render() {
    let locked = false;

    return (
      <div id={styles.okrLayout}>
        {this.selectRender(locked)}
        {this.detailRender()}
        {this.optionRender(locked)}
      </div>
    )
  }
}
