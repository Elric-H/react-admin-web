import React, { PureComponent } from 'react';

const tableStyle = {
  textAlign: 'center',
};

const pieData = [
  { value: 30, color: 'green' },
  { value: 35, color: 'red' },
  { value: 45, color: 'blue' },
  { value: 90, color: 'orange' },
  { value: 160, color: '#ccc' },
];

const lineData = [10, 20, 36, 70, 52, 56, 86, 42, 78];

class Learn1 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getSVGBar = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="250px" height="250px" viewBox="0 0 100 100">
      <g transform="translate(0, 90) scale(1, -1)">
        <g>
          <rect x="1" y="0" width="10" height="25" fill="#37c" />
          <rect x="13" y="0" width="10" height="26" fill="#37c" />
          <rect x="25" y="0" width="10" height="40" fill="#37c" />
          <rect x="37" y="0" width="10" height="45" fill="#37c" />
          <rect x="49" y="0" width="10" height="68" fill="#37c" />
          <rect x="61" y="0" width="10" height="41" fill="#37c" />
          <rect x="73" y="0" width="10" height="70" fill="#37c" />
        </g>
        <g>
          <rect x="1" y="0" width="10" height="15" fill="#3c7" />
          <rect x="13" y="0" width="10" height="11" fill="#3c7" />
          <rect x="25" y="0" width="10" height="17" fill="#3c7" />
          <rect x="37" y="0" width="10" height="25" fill="#3c7" />
          <rect x="49" y="0" width="10" height="37" fill="#3c7" />
          <rect x="61" y="0" width="10" height="25" fill="#3c7" />
          <rect x="73" y="0" width="10" height="37" fill="#3c7" />
        </g>
      </g>
    </svg>
  );

  calcPiePath = () => {
    // 计算饼图所有数据的总和
    const sum = pieData.reduce((t, a) => t + a.value, 0);
    // 分别计算每个扇形的弧度
    const list = pieData.map((d) => ({ arc: (2 * Math.PI * d.value) / sum, color: d.color }));
    let start = { x: 0, y: 40 };
    let add = 0;
    return list.map((p) => {
      const end = { x: 40 * Math.sin(add + p.arc), y: 40 * Math.cos(add + p.arc) };
      // 判断弧线是否大于180度
      const largeArcFlag = p.arc > Math.PI ? 1 : 0;
      const path = (
        <path
          key={p.arc}
          d={`M0 0 L ${start.x} ${start.y} A 40 40 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`}
          fill={p.color}
        />
      );
      start = end;
      add += p.arc;
      return path;
    });
  };

  getSVGPie = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="250px" height="250px" viewBox="0 0 100 100">
      <g transform="translate(50, 50) scale(1, -1)">{this.calcPiePath()}</g>
    </svg>
  );

  getLine = () => {
    const data = lineData.map((l, i) => ({ x: 1 + (i - 1) * 12, y: l }));
    return data.reduce((t, a) => `${t} L ${a.x} ${a.y}`, '');
  };

  getSVGLineChart = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="250px" height="250px" viewBox="0 0 100 100">
      <g transform="translate(0, 90) scale(1, -1)">
        <path d={`M0 0 ${this.getLine()}`} stroke="#ccc" fill="transparent" />
      </g>
    </svg>
  );

  getSVGAreaChart = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="250px" height="250px" viewBox="0 0 100 100">
      <g transform="translate(0, 90) scale(1, -1)">
        <path d={`M0 0 ${this.getLine()} V 0`} stroke="#ccc" fill="#3c7" />
      </g>
    </svg>
  );

  render() {
    return (
      <table style={tableStyle}>
        <tr>
          <td>{this.getSVGBar()}</td>
          <td>{this.getSVGPie()}</td>
          <td>{this.getSVGLineChart()}</td>
          <td>{this.getSVGAreaChart()}</td>
        </tr>
        <tr>
          <th>svg柱状图</th>
          <th>svg饼图</th>
          <th>svg折线图</th>
          <th>svg面积图</th>
        </tr>
      </table>
    );
  }
}

export default Learn1;
