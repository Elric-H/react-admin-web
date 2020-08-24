import React from 'react';
import { Row, Col } from 'antd';

const canvasStyle = {
  width: 250,
  height: 250,
};

/**
 * webGL初探
 * 使用webgl绘制简单的图形
 */
class WebGL1 extends React.PureComponent {
  constructor(props) {
    super(props);
    // 编写两个着色器
    // 顶点着色器
    this.vertex = `
        attribute vec2 position;
        varying vec3 color;

        void main() {
          gl_PointSize = 1.0;
          color = vec3(0.5 + position * 0.5, 0.0);
          gl_Position = vec4(position, 1.0, 1.0);
        }
      `;
    // 片元着色器
    this.fragment = `
        precision mediump float;
        varying vec3 color;

        void main() {
          gl_FragColor = vec4(color, 1.0);
        }
      `;
  }

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

  renderWebGL = (gl, points, mode) => {
    // 分别创建顶点、片元着色器的shader对象
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, this.vertex);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, this.fragment);
    gl.compileShader(fragmentShader);

    // 创建 WebGLProgram 对象，并将这两个 shader 关联到这个 WebGL 程序上
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    // 启用这个WebGLProgram对象
    gl.useProgram(program);

    // 将定义好的数据写入 WebGL 的缓冲区
    const bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

    // 获取顶点着色器中的position变量的地址
    const vPosition = gl.getAttribLocation(program, 'position');
    // 给变量设置长度和类型
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    // 激活该变量
    gl.enableVertexAttribArray(vPosition);

    // 执行着色器程序完成绘制
    // 先调用clear将当前画布内容清除
    gl.clear(gl.COLOR_BUFFER_BIT);
    // 调用drawArrays传入绘图模式,选择TRIANGLES表示以三角形为图元绘制
    gl.drawArrays(mode, 0, points.length / 2);
  };

  renderTriangle = () => {
    const gl = this.triangleRef.getContext('webgl');
    if (gl) {
      // 定义三角形的三个顶点
      const points = new Float32Array([-1, -1, 0, 1, 1, -1]);
      this.renderWebGL(gl, points, gl.LINE_LOOP);
    }
  };

  renderSquare = () => {
    const gl = this.squareRef.getContext('webgl');
    if (gl) {
      // 定义正方形的顶点
      const points = new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]);
      this.renderWebGL(gl, points, gl.TRIANGLE_FAN);
    }
  };

  renderPentagon = () => {
    const gl = this.pentagonRef.getContext('webgl');
    if (gl) {
      // 定义三角形的三个顶点
      const points = this.getPolygonPoint(5, 1);
      this.renderWebGL(gl, points, gl.TRIANGLE_FAN);
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
      this.renderWebGL(gl, points, gl.TRIANGLE_FAN);
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
