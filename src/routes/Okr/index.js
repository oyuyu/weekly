import React, {Fragment} from 'react';
import {
  message,
  Row,
  Col,
  Select,
  Button,
  Skeleton,
  List,
  Tag,
} from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import GeneralItem from './GeneralItem';
import ColonelItem from './ColonelItem';
import Line from '../../components/Line';

const Option = Select.Option;
const fullWidth = { width: '100%' };
const tagKey = {
  1: {
    color: '#87d068',
    text: '进展'
  },
  2: {
    color: '#108ee9',
    text: '计划'
  },
  3: {
    color: '#f50',
    text: '问题'
  }
}

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

  getOkrDetail = () => {
    let {
      yearSelectValue,
      quarterSelectValue,
      limit,
    } = this.state;
    if (yearSelectValue < limit.year || (yearSelectValue = limit.year && quarterSelectValue <= limit.quarter)) {
      this.props.dispatch({
        type: 'okr/getOkrDetail',
        payload: {
          year: +yearSelectValue,
          qtype: +quarterSelectValue,
          // userId: this.props.currentUser.userInfo.userId,
          userId: null,
          krId: null,
        }
      })
    } else {
      message.error('不能选择未到的季度！')
    }
  }

  getKrWeeklys = key => {
    const { weeklyDetails } = this.props.okr;

    if (!weeklyDetails[key]) {
      this.props.dispatch({
        type: 'okr/getKrWeeklys',
        payload: {
          krId: key,
        }
      })
    }
  }

  stateHandler = (value, key) => {
    let state = this.state;
    state[key] = value;
    this.setState({
      ...state,
    });

    if (key === 'yearSelectValue' || key === 'quarterSelectValue') return this.getOkrDetail();
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
    const { okrInfo, okrDetails, weeklyDetails } = this.props.okr;

    return (
      <div style={{ marginTop: 24 }}>
        {
          // 加载中
          Object.keys(okrInfo).length === 0 && (
            <Skeleton />
          )
        }
        {
          // okr 详情
          okrDetails.length !== 0 && (
            <Fragment>
              {
                okrDetails.map((value, index) => (
                  <GeneralItem
                    key={value.oid}
                    title={value.odetail}
                    index={index}
                  >
                    {
                      value.krs.map((val, ind) => (
                        <ColonelItem
                          key={val.krId}
                          index={ind + 1}
                          title={val.krDetail}
                          count={val.weeklyCount}
                          onClick={() => this.getKrWeeklys(val.krId)}
                        >
                          <div className={styles.panel}>
                          {
                            weeklyDetails[val.krId] && (
                              weeklyDetails[val.krId].map(value => (
                                <Line
                                  key={value.weeklyId}
                                  label={<div className={styles.title} style={{ fontSize: 18 }}>{value.week}</div>}
                                  labelCol={4}
                                  wrapperCol={20}
                                >
                                  <List
                                    bordered={false}
                                    dataSource={value.weeklys}
                                    renderItem={item => (<List.Item><Tag color={tagKey[item.weeklyType].color}>{tagKey[item.weeklyType].text}</Tag>{item.details}</List.Item>)}
                                  />
                                </Line>
                              ))
                            )
                          }
                          {
                            (!weeklyDetails[val.krId] || weeklyDetails[val.krId].length === 0) &&
                            (
                              <div className={styles.nothing}>
                                没有相关周报！
                              </div>
                            )
                          }
                          </div>
                        </ColonelItem>
                      ))
                    }
                  </GeneralItem>
                ))
              }
            </Fragment>
          )
        }
        {
          // 新建okr
          Object.keys(okrInfo).length !== 0 && !okrInfo.okrDetails && (
            <div className={styles.nothing}>
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
    console.log(this.props.okr);

    return (
      <div id={styles.okrLayout}>
        {this.selectRender(locked)}
        {this.detailRender()}
        {this.optionRender(locked)}
      </div>
    )
  }
}
