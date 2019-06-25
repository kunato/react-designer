import React, { Component } from 'react';
import { modes } from '../constants';
import Icon from '../Icon';
import _ from 'lodash';

import { SizePanel, TextPanel, StylePanel, ArrangePanel, ImagePanel } from '../panels';

export default class Vector extends Component {
  static panels = [SizePanel, TextPanel, StylePanel, ImagePanel, ArrangePanel];

  getTransformMatrix({ rotate, x, y }) {
    return `
      translate(${x} ${y})
      rotate(${rotate || 0})
    `;
  }

  getObjectAttributes() {
    let { object, onRender, ...rest } = this.props;
    const { x, y, ...objectRest } = object;
    return {
      ...objectRest,
      transform: this.getTransformMatrix(object),
      ref: onRender,
      ...rest,
    };
  }
}
