import React, { Component } from 'react';
import { modes } from '../constants';
import Icon from '../Icon';
import _ from 'lodash';

import Vector from './Vector';
import BezierEditor from '../editors/BezierEditor';

export default class Path extends Vector {
  static meta = {
    initial: {
      fill: '#e3e3e3',
      closed: false,
      rotate: 0,
      px: 0,
      py: 0,
      path: [],
      stroke: 'gray',
      strokeWidth: 1,
    },
    mode: modes.DRAW_PATH,
    icon: <Icon icon={'polygon'} size={30} />,
    editor: BezierEditor,
  };

  buildPath(object) {
    let { path } = object;

    let curves = path.map(({ x1, y1, x2, y2, x, y }, i) => `C ${x1} ${y1}, ${x2} ${y2}, ${x} ${y}`);

    let instructions = [`M ${object.px} ${object.py}`, ...curves];

    if (object.closed) {
      instructions = [...instructions, 'Z'];
    }

    return instructions.join('\n');
  }

  componentDidMount() {
    this.setState({ yo: 'hello' });
  }

  getTransformMatrix({ rotate, x, y }) {
    return `
      translate(${x} ${y})
      rotate(${rotate})
    `;
  }

  getObjectAttributes() {
    let { object, onRender, ...rest } = this.props;
    const { x, y, height, width, ...orest } = object;
    return {
      ...orest,
      transform: this.getTransformMatrix(object),
      ref: onRender,
      ...rest,
    };
  }

  render() {
    let { object } = this.props;
    let fill = object.closed ? object.fill : 'transparent';
    const childrenBBox = this.ref && this.ref.getBBox();
    return (
      <svg
        {...this.getObjectAttributes()}
        x="0"
        y="0"
        preserveAspectRatio="none"
        viewBox={
          childrenBBox &&
          `${childrenBBox.x} ${childrenBBox.y} ${childrenBBox.width} ${childrenBBox.height}`
        }
        style={{ position: 'absolute' }}
        height={`${object.height}`}
        width={`${object.width}`}
      >
        <path ref={el => (this.ref = el)} d={this.buildPath(object)} fill={fill} />
      </svg>
    );
  }
}
