import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { renderWebGL, getTriangles, getTrianglesLines } from './common/GLUtils';

const canvasStyle = {
  width: 500,
  height: 500,
};

// 不规则多边形坐标
const vertices = [
  [-0.7, 0.5],
  [-0.4, 0.3],
  [-0.25, 0.71],
  [-0.1, 0.56],
  [-0.1, 0.13],
  [0.4, 0.21],
  [0, -0.6],
  [-0.3, -0.3],
  [-0.6, -0.3],
  [-0.45, 0.0],
];

const points = vertices.flat();

class WebGL2 extends PureComponent {
  componentDidMount() {
    this.renderTrianglesGL();
    this.renderTrianglesLinesGL();
  }

  renderTrianglesGL = () => {
    const gl = this.trianglesRef.getContext('webgl');
    if (gl) {
      const position = new Float32Array(getTriangles(points));
      renderWebGL(gl, position, gl.TRIANGLES);
    }
  };

  renderTrianglesLinesGL = () => {
    const gl = this.trianglesLineRef.getContext('webgl');
    if (gl) {
      const position = new Float32Array(getTrianglesLines(points));
      renderWebGL(gl, position, gl.LINES);
    }
  };

  render() {
    return (
      <Row>
        <Col>
          <canvas
            {...canvasStyle}
            ref={(ref) => {
              this.trianglesRef = ref;
            }}
          />
        </Col>
        <Col>
          <canvas
            {...canvasStyle}
            ref={(ref) => {
              this.trianglesLineRef = ref;
            }}
          />
        </Col>
      </Row>
    );
  }
}

export default WebGL2;
