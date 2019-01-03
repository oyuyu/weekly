import React, {Fragment} from 'react';
import {
  Icon,
  Button,
  Collapse,
} from 'antd';
import styles from './index.less';
import './antd.less';

const Panel = Collapse.Panel;

function DropButton (props) {
  return (
    <Button style={{ marginRight: 16 }} size='small' type='primary' onClick={props.onClick}>
      <Icon style={{ transform: props.down ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'all 0.2s' }} type="caret-right" />
      {props.text}
    </Button>
  )
}

function callback(key) {
  console.log(key);
}

export default class ColonelItem extends React.Component {
  state = {
    down: false,
  };

  downHandler = () => {
    this.props.onClick();

    const down = !this.state.down;
    this.setState({
      down,
    })
  }

  render() {
    let panelStyle = {
      maxHeight: 1000,
    };
    if (!this.state.down) {
      panelStyle.maxHeight = 0;
    }

    return (
      <div className={styles.itemLayout}>
        <div className={styles.title}><DropButton down={this.state.down} text={`${this.props.count}条周报`} onClick={this.downHandler} />{this.props.index}、{this.props.title}</div>
        <Collapse onChange={callback} bordered={false} activeKey={this.state.down ? '1' : '0'} style={{ padding: 0, margin: 0}}>
          <Panel
            key={'1'}
            showArrow={false}
          >
            {this.props.children}
          </Panel>
        </Collapse>
      </div>
    )
  }
}
