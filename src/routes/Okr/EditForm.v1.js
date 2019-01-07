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
  labelCol: {
    xs: { span: 2 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 22 },
    sm: { span: 22 },
  },
};
const formItemLayoutButtonWithSub = {
  wrapperCol: {
    xs: { span: 22, offset: 2 },
    sm: { span: 22, offset: 2 },
  },
}

@Form.create()
export default class EditForm extends React.Component {
  state = {
    keys: [
      {
        id: 0,
        children: [0]
      }
    ]
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

  itemRemove = (type, index, ind) => {
    let {keys} = this.state;
    if (type === 1) {
      keys.splice(index, 1);
    } else if (type === 2) {
      keys[index].children.splice(ind, 1);
    }

    this.setState({
      keys,
    })
  }

  itemAdd = (type, index) => {
    const {keys} = this.state;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (type === 1) {
          keys.push({
            id: keys[keys.length -1].id + 1,
            children: [0]
          })
        } else if (type === 2) {
          keys[index].children.push(keys[index].children[keys[index].children.length - 1] + 1)
        }
      }
    });
    this.setState({
      keys,
    })

  }

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);

        const {keys} = this.state;
        // console.log(keys);

        const {userInfo} = this.props.currentUser;

        let okrDetails = keys.map(value => {
          let temp = {
            oDetail: values.targets[value.id],
            oType: null,
            krs: value.children.map(val => (
              {
                krDetail: values.results[value.id][val],
                krType: null,
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
          oDetail: "其他 默认添加",
          oType: 0,
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

        this.props.dispatch({
          type: 'okr/addNewOkr',
          payload: {newOkrVo}
        })
      }
    }).catch(value => {
      console.log(value);
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { keys } = this.state;

    const formItems = keys.map((value, index) => {
      const subFormItems = value.children.map((val, ind) => (
        <Form.Item
          {...formItemLayoutWithSub}
          required={false}
          style={{ margin: 0 }}
          label={'*'}
          colon={false}
          key={val}
        >
          {getFieldDecorator(`results[${value.id}][${val}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              // required: true,
              // whitespace: true,
            }, {
              validator: this.checkItemSub,
            }],
          })(
            <Input
              placeholder={`${ind + 1}、关键结果。限制 100 个字`}
              addonAfter={value.children.length > 1 ? (
                <Icon
                  type="close"
                  style={{ cursor: 'pointer' }}
                  onClick={() => { this.itemRemove(2, index, ind) }}
                />
              ) : null}
            />
          )}
        </Form.Item>
      ))

      return (
        <Card key={value.id} style={{ borderRadius: '10px', marginBottom: '10px' }}>
          <Form.Item
            {...formItemLayout}
            required={false}
            style={{ margin: 0 }}
          >
            {getFieldDecorator(`targets[${value.id}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                // required: true,
                // whitespace: true,
              }, {
                validator: this.checkItem,
              }],
            })(
              <Input
                placeholder={`${number[index]}、目标。限制 40 个字`}
                addonAfter={keys.length > 1 ? (
                  <Icon
                    type="close"
                    style={{ cursor: 'pointer' }}
                    onClick={() => { this.itemRemove(1, index) }}
                  />
                ) : null}
              />
            )}
          </Form.Item>
          {subFormItems}
          <Form.Item
            {...formItemLayoutButtonWithSub}
            style={{ margin: 0 }}
          >
            <Button
              style={{ width: '100%', textAlign: 'left' }}
              type="dashed"
              onClick={() => { this.itemAdd(2, index)}}
            >
              <Icon type="plus" />添加关键结果
            </Button>
          </Form.Item>
        </Card>
      )
    })

    return (
      <div id={styles.editForm}>
        <Form>
          {formItems}
          <Card style={{ borderRadius: '10px' }}>
            <Button
              style={{ width: '100%', textAlign: 'left' }}
              type="dashed"
              onClick={() => { this.itemAdd(1)}}
            >
              <Icon type="plus" />添加目标
            </Button>
          </Card>
        </Form>
      </div>
    )
  }
}
