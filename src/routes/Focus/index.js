import React, { PureComponent, Fragment } from 'react';
import {
  Row,
  Col,
  Card,
  Select,
  DatePicker,
  Form,
  Input,
  Table,
} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import './antd.less';

moment.locale('zh-cn');
const { WeekPicker } = DatePicker;
const InputGroup = Input.Group;
const Option = Select.Option;
const itemLayout = {
  xs: { span: 6 },
  sm: { span: 6 },
}
const dateFormat = 'YYYY/MM/DD';
function disabledDate(current) {
  // Can not select days before today and today
  return current > moment().endOf('day');
}
const oneDayTimestamp = 86400000;
function weekCount(timestamp) {
  let date = new Date(timestamp);
  let beginDay = date.getTime() - (date.getDay() - 1) * oneDayTimestamp;
  let endDay = beginDay + 6 * oneDayTimestamp;

  let begin = new Date(beginDay);
  let end = new Date(endDay);
  return {
    year: begin.getFullYear(),
    month: begin.getMonth() + 1,
    qType: parseInt(begin.getMonth() / 3 + 1),
    week: Math.ceil(begin.getDate() / 7),
    beginDay,
    endDay,
  }
}
const initColumns = [{
  title: '姓名',
  dataIndex: 'userName',
  key: 'userName',
  align: 'center',
}, {
  title: '所属部门',
  dataIndex: 'deptName',
  key: 'deptName',
  align: 'center',
}, {
  title: '周报内容',
  dataIndex: 'weeklyDetail',
  key: 'weeklyDetail',
  align: 'center',
}]


@connect(state => ({
  currentUser: state.user,
  data: state.focus,
}))
export default class Focus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deptId: -1,
      weekType: -1,
      weekInfo: weekCount((new Date()).getTime()),
      pageNumber: 1,
      pageSize: 10,
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'focus/getDepartmentList',
    })

    this.getFocusWeeklyList(this.state);
  }

  stateHandler = (value, key, reset) => {
    let state = this.state;
    state[key] = value;
    this.setState({...state});

    this.getFocusWeeklyList(state);
  }

  getFocusWeeklyList = (state, pageNumber, pageSize) => {
    this.props.dispatch({
      type: 'focus/getFocusWeeklyList',
      payload: {
        deptId: state.deptId || -1,
        weekType: state.weekType || -1,
        year: state.weekInfo.year,
        month: state.weekInfo.month,
        qtype: state.weekInfo.qType,
        week: state.weekInfo.week,
        pageIndex: pageNumber || state.pageNumber || 1,
        pageSize: pageSize || state.pageSize || 10,
      }
    })
  }

  weekOnChange = (date, dateString) => {
    // console.log(date, dateString);
    // console.log(moment(date).format('YYYY-MM-DD'));
    // console.log(date.valueOf(), date.valueOf() + 518400000);
    // console.log(moment(date.valueOf()).format('YYYY-MM-DD'), moment(date.valueOf() + 518400000).format('YYYY-MM-DD'));
    let weekInfo = weekCount(moment(date.valueOf()));
    this.stateHandler(weekInfo, 'weekInfo');
  }

  searchRender = () => {
    const {weekInfo, deptId, weekType} = this.state;

    return (
      <Row gutter={8} style={{ margin: '16px 0' }}>
        <Col {...itemLayout}>
          <InputGroup compact>
            <Input style={{ width: '30%' }} type={'button'} value={`Month${weekInfo.month}-${weekInfo.week}`} />
            <WeekPicker
              style={{ width: '70%' }}
              onChange={this.weekOnChange}
              allowClear={false}
              format={`${moment(weekInfo.beginDay).format(dateFormat)} ~ ${moment(weekInfo.endDay).format(dateFormat)}`}
              disabledDate={disabledDate}
              defaultValue={moment('2019-01-01')}
            />
          </InputGroup>
        </Col>
        <Col {...itemLayout}>
          <Select value={deptId} style={{ width: '100%' }} onChange={value => this.stateHandler(value, 'deptId')}>
            <Option value={-1}>全部部门</Option>
            {
              this.props.data.departmentList.map(value => (
                <Option key={value.deptId} value={value.deptId}>{value.deptName}</Option>
              ))
            }
          </Select>
        </Col>
        <Col {...itemLayout}>
          <Select value={weekType} style={{ width: '100%' }} onChange={value => this.stateHandler(value, 'weekType')}>
            <Option value={-1}>全部状态</Option>
            <Option value={0}>未填写</Option>
            <Option value={1}>已填写</Option>
          </Select>
        </Col>
      </Row>
    )
  }

  renderTable = () => {
    let dataSource = this.props.data.userWeeklyList.data;
    const {totalCount} = this.props.data.userWeeklyList;
    let paginationProps = {
      pageNumber: this.state.pageNumber,
      pageSize: this.state.pageSize,
      total: totalCount,
      showTotal: () => `共${totalCount}条`,
      onChange: (pageNumber, pageSize) => {
        this.setState({
          pageNumber,
          pageSize,
        })
        this.getFocusWeeklyList(pageNumber, pageSize)
      },
      onShowSizeChange: (pageNumber, pageSize) => {
        this.setState({
          pageNumber: 1,
          pageSize,
        })
        this.getFocusWeeklyList(1, pageSize)
      },
    }

    dataSource = dataSource.map(value => ({
      ...value,
      key: value.userId,
    }))

    let columns = [
      ...initColumns,
      {
        title: '操作',
        dataIndex: 'option',
        key: 'option',
        align: 'center',
        width: '40%',
        render: (text, record) => (
          <Row>
            <Col span={8}><a>详情</a></Col>
            <Col span={8}><a>全部周报</a></Col>
            <Col span={8}><a>OKR</a></Col>
          </Row>
        ),
      }
    ];

    return (
      <Table
        style={{ marginTop: 20 }}
        size={'small'}
        bordered={true}
        columns={columns}
        dataSource={dataSource}
        pagination={paginationProps}
      />
    )
  }

  render() {
    return (
      <Card
        bordered={false}
      >
        {this.searchRender()}
        {this.renderTable()}
      </Card>
    )
  }
}
