import React, {Fragment} from 'react';
import {
  Form,
  Input,
  Card,
  Button,
  Icon,
} from 'antd';
import styles from './index.less';

const number = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十'];
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};
const formItemLayoutWithSub = {
  wrapperCol: {
    xs: { span: 22, offset: 2 },
    sm: { span: 22, offset: 2 },
  },
};
const formItemAddButtonStyle = {
  width: '100%',
  textAlign: 'left',
};
const formItemCardStyle = {
  borderRadius: '10px',
  marginBottom: '10px',
  background: '#FBFBFB',
};

@Form.create()
export default class EditForm extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.init.length !== 0) {
      console.log(this.props.init);
      const {init} = this.props;
      let keys = [];
      init.forEach(((value, index) => {
        if (index === init.length - 1) return void(0);

        let children = [];
        value.krs.forEach((val, ind) => {
          if (ind === value.krs.length -1) return void(0);

          children.push({
            id: ind,
            krId: val.krId,
            value: val.krDetail,
          })
        })
        keys.push({
          id: index,
          oid: value.oid,
          value: value.odetail,
          children,
        })
      }))

      this.state = {
        keys,
      }
    } else {
      this.state = {
        keys: [
          {
            id: 0,
            value: '',
            children: [
              {
                id: 0,
                value: '',
              }
            ]
          }
        ]
      }
    }
  }

  componentDidMount() {
    const {keys} = this.state;
    if (this.props.init.length !== 0) {
      let targets = [], results = [];
      keys.forEach((value, index) => {
        targets.push(value.value);
        results[value.id] = value.children.map((val, ind) => (val.value))
      });

      this.props.form.setFieldsValue({
        targets,
        results,
      });
    }
  }

  checkItem = (rule, value, callback) => {
    const { form } = this.props;
    if (!value) callback('');
    else if (value.length > 40) callback('');
    else callback();
  };

  checkItemSub = (rule, value, callback) => {
    const { form } = this.props;
    if (!value) callback('');
    else if (value.length > 100) callback('');
    else callback();
  };

  itemRemove = (type, params) => {
    let {keys} = this.state;

    if (type === 1) {
      keys.splice(params.index, 1);
    } else if (type === 2) {
      keys[params.index].children.splice(params.ind, 1);
    }

    this.setState({
      keys,
    })
  }

  itemAdd = (type, index) => {
    let {keys} = this.state;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        if (type === 1) {
          keys.push({
            id: keys[keys.length - 1].id + 1,
            value: '',
            children: [{ id: 0, value: '' }],
          });
        } else if (type === 2) {
          keys[index].children.push({
            id: keys[index].children[keys[index].children.length - 1].id + 1,
            value: '',
          });
        }
      }
    });

    this.setState({
      keys,
    })
  }

  handleChange = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        const {keys} = this.state;
        const {userInfo} = this.props.currentUser;
        let okrDetails = keys.map(value => {
          let temp = {
            odetail: values.targets[value.id],
            otype: null,
            krs: value.children.map(val => (
              {
                krDetail: values.results[value.id][val.id],
                krId: '',
              }
            ))
          }
          temp.krs.push({
            krDetail: "其他 默认添加",
            krType: 0,
          })
          return temp
        });
        okrDetails.push({
          odetail: "其他 默认添加",
          otype: 0,
          krs: [{
            krDetail: "其他 默认添加",
            krType: 0,
          }]
        })
        let newOkrVo = {
          userId: userInfo.userId,
          year: this.props.year,
          qtype: this.props.quarter,
          okrDetails,
        }
        // console.log(newOkrVo);

        if (this.props.id && this.props.init.length !== 0) {
          this.props.dispatch({
            type: 'okr/editOkr',
            payload: {
              okrDetails,
              okrId: this.props.id,
            }
          });
        } else {
          this.props.dispatch({
            type: 'okr/addNewOkr',
            payload: {newOkrVo}
          });
        }
      }
    }).catch(value => {
      console.log(value);
    });
  }

  render() {
    const { getFieldDecorator, getRieldValue } = this.props.form;
    const { keys } = this.state;

    const formItems = keys.map((value, index) => {
      const subFormItems = value.children.map((val, ind) => (
        <Form.Item
          {...formItemLayoutWithSub}
          required={false}
          style={{ margin: 0 }}
          colon={false}
          key={val.id}
        >
          {getFieldDecorator(`results[${value.id}][${val.id}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              validator: this.checkItemSub,
            }]
          })(
            <Input
              placeholder={`${ind + 1}、关键结果。限制 100 个字`}
              addonAfter={value.children.length > 1 ? (
                <Icon
                  type="close"
                  style={{ color: 'rgba(0,0,0,.25)', cursor: 'pointer' }}
                  onClick={() => { this.itemRemove(2, {index, ind}) }}
                />
              ) : null}
            />
          )}
        </Form.Item>
      ))

      return (
        <Card key={value.id} style={formItemCardStyle}>
          <Form.Item
            {...formItemLayout}
            required={false}
            style={{margin: 0}}
          >
            {getFieldDecorator(`targets[${value.id}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                validator: this.checkItem,
              }],
            })(
              <Input
                placeholder={`${number[index] || index + 1}、目标。限制 40 个字`}
                addonAfter={keys.length > 1 ? (
                  <Icon
                    type="close"
                    style={{ color: 'rgba(0,0,0,.25)', cursor: 'pointer' }}
                    onClick={() => { this.itemRemove(1, {index}) }}
                  />
                ) : null}
              />
            )}
          </Form.Item>
          {subFormItems}
          <Form.Item
            {...formItemLayoutWithSub}
            style={{ margin: 0 }}
          >
            <ButtonAdd onClick={() => { this.itemAdd(2, index) }} text={'添加关键结果'} />
          </Form.Item>
        </Card>
      )
    });

    return (
      <div id={styles.editForm}>
        <Form onChange={this.handleChange}>
          {formItems}
          <Card style={formItemCardStyle}>
            <ButtonAdd onClick={() => { this.itemAdd(1) }} text={'添加目标'} />
          </Card>
        </Form>
      </div>
    )
  }
}

function ButtonAdd (props) {
  return (
    <Button
      style={formItemAddButtonStyle}
      type="dashed"
      onClick={props.onClick}
    >
      <Icon type="plus" />{props.text}
    </Button>
  )
}
