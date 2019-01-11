import React, {Fragment} from 'react';
import {
  Card,
  Input,
  Select,
  Row,
  Col,
  Button,
  Table,
  Divider,
} from 'antd';
import { connect } from 'dva';

const Option = Select.Option;
const itemLayout = {
  xs: { span: 4 },
  sm: { span: 4 },
}

const initColumns = [{
  title: '姓名',
  dataIndex: 'userName',
  key: 'userName',
  align: 'center',
}, {
  title: '账号',
  dataIndex: 'ldapName',
  key: 'ldapName',
  align: 'center',
}, {
  title: '所属部门',
  dataIndex: 'deptName',
  key: 'deptName',
  align: 'center',
},
// {
//   title: '操作',
//   dataIndex: 'option',
//   key: 'option',
//   align: 'center',
//   render: (text, record) => (
//     <span>
//       <a>Invite {record.userName}</a>
//       <Divider type="vertical" />
//       <a>Delete</a>
//     </span>
//   ),
// }
];


@connect(state => ({
  currentUser: state.user,
  data: state.crew,
}))
export default class Crew extends React.Component {
  state = {
    deptId: -1,
    attentionType: -1,
    name: '',
    pageNumber: 1,
    pageSize: 10,
  }

  componentDidMount() {
    this.getUserList();

    this.props.dispatch({
      type: 'crew/getDepartmentList',
    })
  }

  stateHandler = (value, key, reset) => {
    let state = this.state;
    state[key] = value;
    this.setState(state);
  }

  getUserList = (pageNumber, pageSize) => {
    let params = this.state;

    this.props.dispatch({
      type: 'crew/getUserList',
      payload: {
        deptId: params.deptId || -1,
        attentionType: params.attentionType || -1,
        name: params.name,
        pageIndex: pageNumber || params.pageNumber || 1,
        pageSize: pageSize || params.pageSize || 10,
      }
    })
  }

  searchRender = () => {
    return (
      <Row gutter={8} style={{ margin: '16px 0' }}>
        <Col {...itemLayout}>
          <Select value={this.state.deptId} style={{ width: '100%' }} onChange={value => this.stateHandler(value, 'deptId')}>
            <Option value={-1}>全部部门</Option>
            {
              this.props.data.departmentList.map(value => (
                <Option key={value.deptId} value={value.deptId}>{value.deptName}</Option>
              ))
            }
          </Select>
        </Col>
        <Col {...itemLayout}>
          <Select value={this.state.attentionType} style={{ width: '100%' }} onChange={value => this.stateHandler(value, 'attentionType')}>
            <Option value={-1}>关注状态</Option>
            <Option value={0}>未关注</Option>
            <Option value={1}>已关注</Option>
          </Select>
        </Col>
        <Col {...itemLayout}>
          <Input placeholder="输入人员姓名搜索" value={this.state.name} onChange={e => this.stateHandler(e.target.value, 'name')} />
        </Col>
        <Col {...itemLayout}>
          <Button type="primary" icon="search" onClick={() => this.getUserList()}>搜索</Button>
        </Col>
      </Row>
    )
  }

  handleFocus = (type, attentionUserId) => {
    if (type === 0) {
      this.props.dispatch({
        type: 'crew/setFocusOnUser',
        payload: {
          attentionUserId,
        }
      })
    } else if (type === 1) {
      this.props.dispatch({
        type: 'crew/setRemoveFocus',
        payload: {
          attentionUserId,
        }
      })
    }

    this.getUserList();
  }

  renderTable = () => {
    let dataSource = this.props.data.userList.data;
    const {totalCount} = this.props.data.userList;
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
        this.getUserList(pageNumber, pageSize)
      },
      onShowSizeChange: (pageNumber, pageSize) => {
        this.setState({
          pageNumber: 1,
          pageSize,
        })
        this.getUserList(1, pageSize)
      },
    }

    dataSource = dataSource.map(value => ({
      ...value,
      key: value.ldapName,
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
            <Col span={8}><a>查看周报</a></Col>
            <Col span={8}><a>查看 OKR</a></Col>
            <Col span={8}>{record.focusType === 0 ? (
              <a onClick={() => this.handleFocus(0, record.userId)}>关注</a>
            ) : (
              <a onClick={() => this.handleFocus(1, record.userId)}>取消关注</a>
            )}</Col>
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
