import React, { PureComponent } from 'react';
import styles from './index.less';
import defaultOptions from './config';

class Recorder extends PureComponent {
  static get ERR_NOT_ENOUGH_POINTS() {
    return 'not enough points';
  }

  static get ERR_USER_CANCELED() {
    return 'user canceled';
  }

  static get ERR_NO_TASK() {
    return 'no task';
  }

  constructor(props) {
    super(props);
    this.state = {
      canvasStyle: {},
    };
  }

  componentDidMount() {
    const width = 2 * this.container.getBoundingClientRect().width;
    this.setState(
      {
        canvasStyle: {
          width,
          height: width,
        },
      },
      () => this.initPath(),
    );
  }

  getCanvasPoint = (canvas, x, y) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: 2 * (x - rect.left), // canvas 显示大小缩放为实际大小的 50%。为了让图形在 Retina 屏上清晰
      y: 2 * (y - rect.top),
    };
  };

  distance = (p1, p2) => {
    const x = p2.x - p1.x;
    const y = p2.y - p1.y;
    return Math.sqrt(x * x + y * y);
  };

  /**
   * 绘制实心圆
   * @param ctx
   * @param color
   * @param x
   * @param y
   * @param r
   */
  drawSolidCircle = (ctx, color, x, y, r) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  };

  /**
   * 画空心圆
   * @param ctx
   * @param color
   * @param x
   * @param y
   * @param r
   */
  drawHollowCircle = (ctx, color, x, y, r) => {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.stroke();
  };

  /**
   * 画线段
   * @param ctx
   * @param color
   * @param x1
   * @param y1
   * @param x2
   * @param y2
   */
  drawLine = (ctx, color, x1, y1, x2, y2) => {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
  };

  initPath() {
    // this.circleCanvas:画圆的 canvas，也是最外层监听事件的 canvas
    // this.lineCanvas画固定线条的 canvas
    // this.moveCanvas画不固定线条的 canvas
    if (!this.circleCanvas || !this.lineCanvas || !this.moveCanvas) return;
    const circleCtx = this.circleCanvas.getContext('2d');
    const lineCtx = this.lineCanvas.getContext('2d');
    const moveCtx = this.moveCanvas.getContext('2d');
    const { width } = this.circleCanvas;
    const { n, fgColor, innerRadius } = defaultOptions;
    circleCtx.clearRect(0, 0, width, width);
    lineCtx.clearRect(0, 0, width, width);
    moveCtx.clearRect(0, 0, width, width);
    const range = Math.round(width / (n + 1));

    const circles = [];

    // drawCircleCenters
    for (let i = 1; i <= n; i += 1) {
      for (let j = 1; j <= n; j += 1) {
        const y = range * i;
        const x = range * j;
        this.drawSolidCircle(circleCtx, fgColor, x, y, innerRadius);
        const circlePoint = { x, y };
        circlePoint.pos = [i, j];
        circles.push(circlePoint);
      }
    }
    this.circles = circles;
  }

  async record() {
    if (this.recordingTask) return this.recordingTask.promise;

    const { circleCanvas, lineCanvas, moveCanvas } = this;
    const circleCtx = circleCanvas.getContext('2d');
    const lineCtx = lineCanvas.getContext('2d');
    const moveCtx = moveCanvas.getContext('2d');

    circleCanvas.addEventListener('touchstart', () => {
      this.initPath();
    });

    const records = [];

    const handler = (evt) => {
      const { clientX, clientY } = evt.changedTouches[0];
      const { bgColor, focusColor, innerRadius, outerRadius, touchRadius } = defaultOptions;
      const touchPoint = this.getCanvasPoint(moveCanvas, clientX, clientY);

      for (let i = 0; i < this.circles.length; i += 1) {
        const point = this.circles[i];
        const x0 = point.x;
        const y0 = point.y;

        if (this.distance(point, touchPoint) < touchRadius) {
          this.drawSolidCircle(circleCtx, bgColor, x0, y0, outerRadius);
          this.drawSolidCircle(circleCtx, focusColor, x0, y0, innerRadius);
          this.drawHollowCircle(circleCtx, focusColor, x0, y0, outerRadius);

          if (records.length) {
            const p2 = records[records.length - 1];
            const x1 = p2.x;
            const y1 = p2.y;

            this.drawLine(lineCtx, focusColor, x0, y0, x1, y1);
          }

          const circle = this.circles.splice(i, 1);
          records.push(circle[0]);
          break;
        }
      }

      if (records.length) {
        const point = records[records.length - 1];
        const x0 = point.x;
        const y0 = point.y;
        const x1 = touchPoint.x;
        const y1 = touchPoint.y;

        moveCtx.clearRect(0, 0, moveCanvas.width, moveCanvas.height);
        this.drawLine(moveCtx, focusColor, x0, y0, x1, y1);
      }
    };

    circleCanvas.addEventListener('touchstart', handler);
    circleCanvas.addEventListener('touchmove', handler);

    const recordingTask = {};
    const result = new Promise((resolve) => {
      const done = () => {
        moveCtx.clearRect(0, 0, moveCanvas.width, moveCanvas.height);
        if (!records.length) return;

        circleCanvas.removeEventListener('touchstart', handler);
        circleCanvas.removeEventListener('touchmove', handler);
        document.removeEventListener('touchend', done);

        let err = null;

        if (records.length < defaultOptions.minPoints) {
          err = new Error(Recorder.ERR_NOT_ENOUGH_POINTS);
        }

        // 这里可以选择一些复杂的编码方式，本例子用最简单的直接把坐标转成字符串
        const res = { err, records: records.map((o) => o.pos.join('')).join('') };

        resolve(res);
        this.recordingTask = null;
      };
      recordingTask.cancel = (res = {}) => {
        const { promise } = this.recordingTask;

        res.err = res.err || new Error(Recorder.ERR_USER_CANCELED);
        circleCanvas.removeEventListener('touchstart', handler);
        circleCanvas.removeEventListener('touchmove', handler);
        document.removeEventListener('touchend', done);
        resolve(res);
        this.recordingTask = null;

        return promise;
      };
      document.addEventListener('touchend', done);
    });

    recordingTask.promise = result;

    this.recordingTask = recordingTask;

    return result;
  }

  async cancel() {
    if (this.recordingTask) {
      return this.recordingTask.cancel();
    }
    return Promise.resolve({ err: new Error(Recorder.ERR_NO_TASK) });
  }

  render() {
    const { canvasStyle } = this.state;
    return (
      <div style={{ width: 300, height: 450 }}>
        <div
          ref={(r) => {
            this.container = r;
          }}
          className={styles.container}
        >
          <canvas
            ref={(r) => {
              this.circleCanvas = r;
            }}
            {...canvasStyle}
          />
          <canvas
            ref={(r) => {
              this.lineCanvas = r;
            }}
            {...canvasStyle}
          />
          <canvas
            ref={(r) => {
              this.moveCanvas = r;
            }}
            {...canvasStyle}
          />
        </div>
      </div>
    );
  }
}

export default Recorder;
