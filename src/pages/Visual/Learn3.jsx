import React, { PureComponent } from 'react';
import { hierarchy, pack } from 'd3';
import { queryRegions } from './service';

const canvasSize = {
  width: 1600,
  height: 1600,
};

const canvasStyle = {
  width: 1000,
  height: 1000,
};

const TAU = Math.PI * 2;

/**
 * 随堂练习3
 * 使用canvas绘制层次关系图
 */
class Learn3 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      root: {},
    };
  }

  async componentDidMount() {
    const data = await queryRegions();
    const regions = hierarchy(data)
      .sum(() => 1)
      .sort((a, b) => b.value - a.value);
    this.setState({
      root: pack(regions).size([1600, 1600]).padding(3)(regions),
    });
    this.getCanvas();
  }

  draw = (ctx, node, { fillStyle = 'rgba(0, 0, 0, 0.2)', textColor = 'white' } = {}) => {
    const { children } = node;
    const { x, y, r } = node;
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, TAU);
    ctx.fill();
    if (children) {
      children.forEach((c) => this.draw(ctx, c));
    } else {
      const { name } = node.data;
      ctx.fillStyle = textColor;
      ctx.font = '1.5rem Arial';
      ctx.textAlign = 'center';
      ctx.fillText(name, x, y);
    }
  };

  getCanvas = () => {
    const { root } = this.state;
    const ctx = this.canvas.getContext('2d');
    if (ctx) {
      this.draw(ctx, root);
    }
  };

  render() {
    return (
      <canvas
        style={canvasStyle}
        {...canvasSize}
        ref={(ref) => {
          this.canvas = ref;
        }}
      />
    );
  }
}

export default Learn3;
