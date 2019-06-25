import React, { Component, useState } from 'react';

const styles = {
  handler: {
    position: 'absolute',
    border: '2px solid #dedede',
    zIndex: 999999,
  },
  anchor: {
    width: 10,
    height: 10,
  },
  anchorHovered: {
    borderColor: 'gray',
  },
  'scaleAnchor-br': bbox => ({
    marginTop: bbox.height + 5,
    marginLeft: bbox.width + 5,
    borderRight: '2px solid #dedede',
    borderBottom: '2px solid #dedede',
    position: 'absolute',
    zIndex: -1,
  }),
  'scaleAnchor-tr': bbox => ({
    marginTop: -8,
    marginLeft: bbox.width + 5,
    borderRight: '2px solid #dedede',
    borderTop: '2px solid #dedede',
    position: 'absolute',
    zIndex: -1,
  }),
  'scaleAnchor-bl': bbox => ({
    marginTop: bbox.height + 5,
    marginLeft: -8,
    borderLeft: '2px solid #dedede',
    borderBottom: '2px solid #dedede',
    position: 'absolute',
    zIndex: -1,
  }),
  'scaleAnchor-tl': _bbox => ({
    marginTop: -8,
    marginLeft: -8,
    borderLeft: '2px solid #dedede',
    borderTop: '2px solid #dedede',
    position: 'absolute',
    zIndex: -1,
  }),
  rotateAnchor: bbox => ({
    marginTop: -8,
    marginLeft: bbox.width / 2,
    borderRadius: '50%',
    border: '2px solid #000',
    position: 'absolute',
    zIndex: -1,
  }),
};

function ScaleAnchor(props) {
  let { boundingBox, pos } = props;
  let [anchorHovered, setAnchorHovered] = useState(false);
  return (
    <div
      style={{
        ...styles.anchor,
        ...(anchorHovered ? styles.anchorHovered : {}),
        ...styles[`scaleAnchor-${pos}`](boundingBox),
      }}
      className={`resize-anchor-${pos}`}
      onMouseOver={() => setAnchorHovered(true)}
      onMouseOut={() => setAnchorHovered(false)}
      onMouseDown={props.onMouseDown}
    />
  );
}

function RotateAnchor(props) {
  let [anchorHovered, setAnchorHovered] = useState(false);
  return (
    <div
      style={{
        ...styles.anchor,
        ...(anchorHovered ? { pointerEvents: 'auto' } : {}),
        ...styles.rotateAnchor(props.boundingBox),
      }}
      className={'rotate-anchor'}
      onMouseOver={() => setAnchorHovered(true)}
      onMouseOut={() => setAnchorHovered(false)}
      onMouseDown={props.onMouseDown}
    />
  );
}

class Handler extends Component {
  onMouseDown(event) {
    // event.preventDefault();
    if (event.target.classList.contains('handler')) {
      this.props.onDrag(event);
    }
  }

  render() {
    let { props } = this;
    let { boundingBox } = props;
    let handlerStyle = {
      ...styles.handler,
      ...boundingBox,
      width: boundingBox.width + 10,
      height: boundingBox.height + 10,
      left: boundingBox.left - 5,
      top: boundingBox.top - 5,
      transform: `rotate(${boundingBox.rotate}deg)`,
    };
    return (
      <div
        className={'handler'}
        style={handlerStyle}
        onMouseLeave={props.onMouseLeave}
        onDoubleClick={props.onDoubleClick}
        onMouseDown={this.onMouseDown.bind(this)}
      >
        {<RotateAnchor onMouseDown={props.onRotate} boundingBox={boundingBox} />}
        {<ScaleAnchor onMouseDown={props.onResize} boundingBox={boundingBox} pos="br" />}
        {<ScaleAnchor onMouseDown={props.onResize} boundingBox={boundingBox} pos="tr" />}
        {<ScaleAnchor onMouseDown={props.onResize} boundingBox={boundingBox} pos="bl" />}
        {<ScaleAnchor onMouseDown={props.onResize} boundingBox={boundingBox} pos="tl" />}
      </div>
    );
  }
}

export default Handler;
