import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';

const canvasSize = {
  width: 500,
  height: 500,
};

const TAU = Math.PI * 2;
const TAU_SEGMENTS = 60;

/**
 * 编写函数绘制曲线、圆...
 */
class Learn4 extends PureComponent {
  componentDidMount() {
    this.drawArc();
    this.drawEllipse();
    this.drawParabola();
    this.drawComplex();
  }

  /**
   * 绘制圆弧
   * @param x0
   * @param y0
   * @param radius
   * @param startAng
   * @param endAng
   */
  arc = (x0, y0, radius, startAng = 0, endAng = TAU) => {
    // 计算绘制的弧度
    const ang = Math.min(TAU, endAng - startAng);
    const ret = ang === TAU ? [] : [[x0, y0]];
    // 根据弧度的长度进行分段（360度分100段，180度分50段...）并向上取整
    const segments = Math.round((TAU_SEGMENTS * ang) / TAU);
    let i = 0;
    while (i <= segments) {
      // 根据圆形的极坐标公式计算圆弧的顶点
      const x = x0 + radius * Math.cos(startAng + (ang * i) / segments);
      const y = y0 + radius * Math.sin(startAng + (ang * i) / segments);
      ret.push([x, y]);
      i += 1;
    }
    // 返回圆弧的顶点数组
    return ret;
  };

  /**
   * 绘制椭圆圆弧
   * @param x0
   * @param y0
   * @param radiusX
   * @param radiusY
   * @param stratAng
   * @param endAng
   */
  ellipse = (x0, y0, radiusX, radiusY, startAng = 0, endAng = TAU) => {
    // 计算绘制的弧度
    const ang = Math.min(TAU, endAng - startAng);
    const ret = ang === TAU ? [] : [[x0, y0]];
    // 根据弧度的长度进行分段（360度分100段，180度分50段...）并向上取整
    const segments = Math.round((TAU_SEGMENTS * ang) / TAU);
    let i = 0;
    while (i <= segments) {
      // 根据圆形的极坐标公式计算圆弧的顶点
      const x = x0 + radiusX * Math.cos(startAng + (ang * i) / segments);
      const y = y0 + radiusY * Math.sin(startAng + (ang * i) / segments);
      ret.push([x, y]);
      i += 1;
    }
    // 返回圆弧的顶点数组
    return ret;
  };

  /**
   * 绘制抛物线
   * @param x0
   * @param y0
   * @param p
   * @param min
   * @param max
   * @returns {[]}
   */
  parabola = (x0, y0, p, min, max) => {
    const ret = [];
    let i = 0;
    while (i <= TAU_SEGMENTS) {
      const s = i / 60;
      const t = min * (1 - s) + max * s;
      const x = x0 + 2 * p * t ** 2;
      const y = y0 + 2 * p * t;
      ret.push([x, y]);
      i += 1;
    }
    return ret;
  };

  draw = (points, ctx, strokeStyle = 'black', fillStyle = null) => {
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.moveTo(...points[0]);
    points.forEach((p) => {
      ctx.lineTo(...p);
    });
    ctx.closePath();
    if (fillStyle) {
      ctx.fillStyle = fillStyle;
      ctx.fill();
    }
    ctx.stroke();
  };

  drawArc = () => {
    const ctx = this.arcRef.getContext('2d');
    ctx.translate(250, 250);
    ctx.scale(1, -1);
    this.draw(this.arc(0, 0, 100), ctx);
  };

  drawEllipse = () => {
    const ctx = this.ellipseRef.getContext('2d');
    ctx.translate(250, 250);
    ctx.scale(1, -1);
    this.draw(this.ellipse(0, 0, 100, 50), ctx);
  };

  drawParabola = () => {
    const ctx = this.parabolaRef.getContext('2d');
    ctx.translate(250, 250);
    ctx.scale(1, -1);
    this.draw(this.parabola(0, 0, 5.5, -50, 50), ctx);
  };

  parametric = (xFunc, yFunc) => {
    return (start, end, seg = 100, ...args) => {
      const points = [];
      let i = 0;
      while (i <= seg) {
        const p = i / seg;
        const t = start * (1 - p) + end * p;
        // 根据圆形的极坐标公式计算圆弧的顶点
        const x = xFunc(t, ...args);
        const y = yFunc(t, ...args);
        points.push([x, y]);
        i += 1;
      }

      return {
        draw: this.draw.bind(null, points),
        points,
      };
    };
  };

  drawComplex = () => {
    const ctx = this.complexRef.getContext('2d');
    ctx.translate(250, 250);
    ctx.scale(1, -1);
    const para = this.parametric(
      (t) => 25 * t,
      (t) => 25 * t ** 2,
    );
    para(-5.5, 5.5).draw(ctx);
    const helical = this.parametric(
      (t, l) => l * t * Math.cos(t),
      (t, l) => l * t * Math.sin(t),
    );
    helical(0, 50, 500, 5).draw(ctx, 'blue');
    const star = this.parametric(
      (t, l) => l * Math.cos(t) ** 3,
      (t, l) => l * Math.sin(t) ** 3,
    );

    star(0, Math.PI * 2, 50, 150).draw(ctx, 'red');
  };

  render() {
    return (
      <Row>
        <Col span={12}>
          <canvas
            {...canvasSize}
            ref={(r) => {
              this.arcRef = r;
            }}
          />
        </Col>
        <Col span={12}>
          <canvas
            {...canvasSize}
            ref={(r) => {
              this.ellipseRef = r;
            }}
          />
        </Col>
        <Col span={12}>
          <canvas
            {...canvasSize}
            ref={(r) => {
              this.parabolaRef = r;
            }}
          />
        </Col>
        <Col span={12}>
          <canvas
            {...canvasSize}
            ref={(r) => {
              this.complexRef = r;
            }}
          />
        </Col>
      </Row>
    );
  }
}

export default Learn4;
