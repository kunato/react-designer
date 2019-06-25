import React, { Component } from 'react';
import Designer from '../../src/Designer';

export default class extends Component {
  state = {
    objects: [
      {
        fill: 'rgba(0, 0, 0, 1)',
        closed: true,
        rotate: 0,
        px: 314,
        py: 6.5625,
        path: [
          { x1: 266, y1: 49.5625, x2: 224, y2: 49.5625, x: 204, y: 69.5625 },
          {
            x1: 169,
            y1: 99.5625,
            x2: 189,
            y2: 152.5625,
            x: 243,
            y: 125.5625,
          },
          { x1: 275, y1: 109.5625, x2: 288, y2: 72.5625, x: 307, y: 26.5625 },
          {
            x1: 321,
            y1: -5.4375,
            x2: 314,
            y2: 6.5625,
            x: 314,
            y: 6.5625,
          },
        ],
        stroke: 'gray',
        strokeWidth: '0',
        type: 'polygon',
        x: 10,
        y: -7.4375,
        height: 100,
        width: 150,
      },
    ],
  };

  handleUpdate(objects) {
    this.setState({ objects });
  }

  render() {
    return (
      <Designer
        width={350}
        height={400}
        background={'#ece2be'}
        objects={this.state.objects}
        onUpdate={this.handleUpdate.bind(this)}
      />
    );
  }
}
