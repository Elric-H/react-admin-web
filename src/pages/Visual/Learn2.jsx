import React, { PureComponent } from 'react';

const tableStyle = {
  textAlign: 'center',
};

const barData = [
  { num: 1, value: 25, color: '#37c' },
  { num: 2, value: 26, color: '#37c' },
  { num: 3, value: 40, color: '#37c' },
  { num: 4, value: 45, color: '#37c' },
  { num: 5, value: 68, color: '#37c' },
  { num: 6, value: 41, color: '#37c' },
  { num: 7, value: 70, color: '#37c' },
  { num: 1, value: 15, color: '#3c7' },
  { num: 2, value: 11, color: '#3c7' },
  { num: 3, value: 17, color: '#3c7' },
  { num: 4, value: 17, color: '#3c7' },
  { num: 5, value: 37, color: '#3c7' },
  { num: 6, value: 25, color: '#3c7' },
  { num: 7, value: 37, color: '#3c7' },
];

const pieData = [
  { value: 30, color: 'green' },
  { value: 35, color: 'red' },
  { value: 45, color: 'blue' },
  { value: 90, color: 'orange' },
  { value: 160, color: '#ccc' },
];

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
    const context = this.bar.getContext('2d');
    if (context) {
      context.translate(0, this.bar.height);
      context.scale(1, -1);
      barData.forEach((b) => {
        context.fillStyle = b.color;
        context.fillRect((b.num - 1) * 35 + 1, 0, 25, b.value * 2.5);
      });
    }
  };

  getCanvasPie = () => {
    const context = this.pie.getContext('2d');
    if (context) {
      context.translate(125, 140);
      context.rotate(-Math.PI / 2);
      // 计算饼图所有数据的总和
      const sum = pieData.reduce((t, a) => t + a.value, 0);
      // 分别计算每个扇形的弧度
      const list = pieData.map((d) => ({ arc: (2 * Math.PI * d.value) / sum, color: d.color }));

      let add = 0;
      list.forEach((p) => {
        context.beginPath();
        context.moveTo(0, 0);
        context.arc(0, 0, 100, add, add + p.arc);
        add += p.arc;
        context.fillStyle = p.color;
        context.fill();
      });
    }
  };

  getCanvaLineChart = () => {
    return null;
  };

  getCanvasAreaChart = () => {
    return null;
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
