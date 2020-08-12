import React, { PureComponent } from 'react';
import { lineData, barData, pieData } from './data';

const tableStyle = {
  textAlign: 'center',
};

const canvasSize = {
  width: 250,
  height: 250,
};

const canvasStyle = {
  width: 250,
  height: 250,
};

class Learn2 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getCanvasBar();
    this.getCanvasPie();
    this.getCanvaLineChart();
    this.getCanvasAreaChart();
  }

  getCanvasBar = () => {
    const ctx = this.bar.getContext('2d');
    if (ctx) {
      ctx.translate(0, this.bar.height);
      ctx.scale(1, -1);
      barData.forEach((b) => {
        ctx.fillStyle = b.color;
        ctx.fillRect((b.num - 1) * 35 + 1, 0, 25, b.value * 2.5);
      });
    }
  };

  getCanvasPie = () => {
    const ctx = this.pie.getContext('2d');
    if (ctx) {
      ctx.translate(125, 140);
      ctx.rotate(-Math.PI / 2);
      // 计算饼图所有数据的总和
      const sum = pieData.reduce((t, a) => t + a.value, 0);
      // 分别计算每个扇形的弧度
      const list = pieData.map((d) => ({ arc: (2 * Math.PI * d.value) / sum, color: d.color }));

      let add = 0;
      list.forEach((p) => {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, 100, add, add + p.arc);
        add += p.arc;
        ctx.fillStyle = p.color;
        ctx.fill();
      });
    }
  };

  getCanvaLineChart = () => {
    const ctx = this.lineChart.getContext('2d');
    if (ctx) {
      ctx.translate(0, this.lineChart.height);
      ctx.scale(1, -1);
      ctx.beginPath();
      ctx.strokeStyle = '#969494';
      lineData.forEach((l, index) => {
        ctx.lineTo(1 + index * 24, l * 2);
      });
      ctx.stroke();
    }
  };

  getCanvasAreaChart = () => {
    const ctx = this.areaChart.getContext('2d');
    if (ctx) {
      ctx.translate(0, this.areaChart.height);
      ctx.scale(1, -1);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.fillStyle = '#3c7';
      let end = 0;
      lineData.forEach((l, index) => {
        ctx.lineTo(1 + index * 24, l * 2);
        end = 1 + index * 24;
      });
      ctx.lineTo(end, 0);
      ctx.fill();
    }
  };

  render() {
    return (
      <table style={tableStyle}>
        <tr>
          <td>
            <canvas
              style={canvasStyle}
              {...canvasSize}
              ref={(ref) => {
                this.bar = ref;
              }}
            />
          </td>
          <td>
            <canvas
              style={canvasStyle}
              {...canvasSize}
              ref={(ref) => {
                this.pie = ref;
              }}
            />
          </td>
          <td>
            <canvas
              style={canvasStyle}
              {...canvasSize}
              ref={(ref) => {
                this.lineChart = ref;
              }}
            />
          </td>
          <td>
            <canvas
              style={canvasStyle}
              {...canvasSize}
              ref={(ref) => {
                this.areaChart = ref;
              }}
            />
          </td>
        </tr>
        <tr>
          <th>canvas柱状图</th>
          <th>canvas饼图</th>
          <th>canvas折线图</th>
          <th>canvas面积图</th>
        </tr>
      </table>
    );
  }
}

export default Learn2;
