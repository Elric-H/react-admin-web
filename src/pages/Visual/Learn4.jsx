import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';

import { Vector2D } from './common/Vector2D';

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
    this.drawQuadricBezier();
    this.drawCubicBezier();
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

  draw = (points, ctx, strokeStyle = 'black', fillStyle = null, close = false) => {
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.moveTo(...points[0]);
    points.forEach((p) => {
      ctx.lineTo(...p);
    });
    if (close) {
      ctx.closePath();
    }

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
    this.draw(this.parabola(0, 0, 5.5, -10, 10), ctx);
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
    // 绘制抛物线
    const para = this.parametric(
      (t) => 25 * t,
      (t) => 25 * t ** 2,
    );
    para(-5.5, 5.5).draw(ctx);
    // 绘制阿基米德螺旋线
    const helical = this.parametric(
      (t, l) => l * t * Math.cos(t),
      (t, l) => l * t * Math.sin(t),
    );
    helical(0, 50, 500, 5).draw(ctx, 'blue');
    // 绘制星形线
    const star = this.parametric(
      (t, l) => l * Math.cos(t) ** 3,
      (t, l) => l * Math.sin(t) ** 3,
    );

    star(0, Math.PI * 2, 50, 150).draw(ctx, 'red');
  };

  drawQuadricBezier = () => {
    const ctx = this.quadricBezierRef.getContext('2d');
    ctx.translate(250, 250);
    ctx.scale(1, -1);
    const render = this.parametric(
      (t, [{ x: x0 }, { x: x1 }, { x: x2 }]) =>
        (1 - t) ** 2 * x0 + 2 * t * (1 - t) * x1 + t ** 2 * x2,
      (t, [{ y: y0 }, { y: y1 }, { y: y2 }]) =>
        (1 - t) ** 2 * y0 + 2 * t * (1 - t) * y1 + t ** 2 * y2,
    );

    const p0 = new Vector2D(0, 0);
    const p1 = new Vector2D(100, 0);
    p1.rotate(0.75);
    const p2 = new Vector2D(200, 0);
    const count = 30;
    let i = 0;
    while (i < count) {
      p1.rotate((2 / count) * Math.PI);
      p2.rotate((2 / count) * Math.PI);
      render(0, 1, 100, [p0, p1, p2]).draw(ctx);
      i += 1;
    }
  };

  drawCubicBezier = () => {
    const ctx = this.cubicBezierRef.getContext('2d');
    ctx.translate(250, 250);
    ctx.scale(1, -1);
    const cubicBezier = this.parametric(
      (t, [{ x: x0 }, { x: x1 }, { x: x2 }, { x: x3 }]) =>
        (1 - t) ** 3 * x0 + 3 * t * (1 - t) ** 2 * x1 + 3 * (1 - t) * t ** 2 * x2 + t ** 3 * x3,
      (t, [{ y: y0 }, { y: y1 }, { y: y2 }, { y: y3 }]) =>
        (1 - t) ** 3 * y0 + 3 * t * (1 - t) ** 2 * y1 + 3 * (1 - t) * t ** 2 * y2 + t ** 3 * y3,
    );
    //
    const p0 = new Vector2D(0, 0);
    const p1 = new Vector2D(100, 0);
    p1.rotate(0.75);
    const p2 = new Vector2D(150, 0);
    p2.rotate(-0.75);
    const p3 = new Vector2D(200, 0);
    const count = 30;
    let i = 0;
    while (i < count) {
      p1.rotate((2 / count) * Math.PI);
      p2.rotate((2 / count) * Math.PI);
      p3.rotate((2 / count) * Math.PI);
      cubicBezier(0, 1, 100, [p0, p1, p2, p3]).draw(ctx);
      i += 1;
    }
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
        <Col span={12}>
          <canvas
            {...canvasSize}
            ref={(r) => {
              this.quadricBezierRef = r;
            }}
          />
        </Col>
        <Col span={12}>
          <canvas
            {...canvasSize}
            ref={(r) => {
              this.cubicBezierRef = r;
            }}
          />
        </Col>
      </Row>
    );
  }
}

export default Learn4;
