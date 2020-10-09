import React from 'react';
import { Row, Col } from 'antd';
import { renderWebGL } from './common/GLUtils';

const canvasStyle = {
  width: 250,
  height: 250,
};

/**
 * webGL初探
 * 使用webgl绘制简单的图形
 */
class WebGL1 extends React.PureComponent {
  componentDidMount() {
    this.renderTriangle();
    this.renderSquare();
    this.renderPentagon();
    this.renderStar();
  }

  // 计算多边形顶点坐标
  getPolygonPoint = (num, radius) => {
    const points = [0, radius];
    let n = 1;
    while (n < num) {
      // 计算x轴坐标
      points.push(radius * Math.sin((n * Math.PI * 2) / num));
      // 计算y轴坐标
      points.push(radius * Math.cos((n * Math.PI * 2) / num));
      n += 1;
    }
    return new Float32Array(points);
  };

  renderTriangle = () => {
    const gl = this.triangleRef.getContext('webgl');
    if (gl) {
      // 定义三角形的三个顶点
      const points = new Float32Array([-1, -1, 0, 1, 1, -1]);
      renderWebGL(gl, points, gl.LINE_LOOP);
    }
  };

  renderSquare = () => {
    const gl = this.squareRef.getContext('webgl');
    if (gl) {
      // 定义正方形的顶点
      const points = new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]);
      renderWebGL(gl, points, gl.TRIANGLE_FAN);
    }
  };

  renderPentagon = () => {
    const gl = this.pentagonRef.getContext('webgl');
    if (gl) {
      // 定义三角形的三个顶点
      const points = this.getPolygonPoint(5, 1);
      renderWebGL(gl, points, gl.TRIANGLE_FAN);
    }
  };

  // 获取星星顶点坐标
  getStarPoints = (num, radius) => {
    // 设置起点
    const points = [0, 0, 0, radius];
    // 内圆半径
    const inside = radius / 2 / Math.cos(Math.PI / num);
    let n = 1;
    while (n <= num) {
      points.push(inside * Math.sin(((2 * n - 1) * Math.PI) / num));
      points.push(inside * Math.cos(((2 * n - 1) * Math.PI) / num));
      points.push(radius * Math.sin((n * 2 * Math.PI) / num));
      points.push(radius * Math.cos((n * 2 * Math.PI) / num));
      n += 1;
    }
    return new Float32Array(points);
  };

  renderStar = () => {
    const gl = this.starRef.getContext('webgl');
    if (gl) {
      // 定义三角形的三个顶点
      const points = this.getStarPoints(6, 1);
      renderWebGL(gl, points, gl.TRIANGLE_FAN);
    }
  };

  render() {
    return (
      <Row>
        <Col span={6}>
          <canvas
            {...canvasStyle}
            ref={(ref) => {
              this.triangleRef = ref;
            }}
          >
            please update ie
          </canvas>
        </Col>
        <Col span={6}>
          <canvas
            {...canvasStyle}
            ref={(ref) => {
              this.squareRef = ref;
            }}
          >
            please update ie
          </canvas>
        </Col>
        <Col span={6}>
          <canvas
            {...canvasStyle}
            ref={(ref) => {
              this.pentagonRef = ref;
            }}
          >
            please update ie
          </canvas>
        </Col>
        <Col span={6}>
          <canvas
            {...canvasStyle}
            ref={(ref) => {
              this.starRef = ref;
            }}
          >
            please update ie
          </canvas>
        </Col>
      </Row>
    );
  }
}

export default WebGL1;
