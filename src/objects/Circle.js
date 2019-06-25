import React, { Component } from 'react';
import { modes } from '../constants';
import Icon from '../Icon';
import _ from 'lodash';

import Vector from './Vector';

export default class Circle extends Vector {
  static meta = {
    icon: <Icon icon={'circle'} size={30} />,
    initial: {
      width: 5,
      height: 5,
      rotate: 0,
      fill: 'yellow',
      strokeWidth: 0,
      blendMode: 'normal',
    },
  };

  render() {
    let { object, index } = this.props;
    return (
      <svg {...this.getObjectAttributes()} style={{ position: 'absolute' }} viewBox="0 0 10 10">
        <ellipse rx={5} ry={5} cx={5} cy={5} />
      </svg>
    );
  }
}
