export default {
  container: null, // 创建canvas的容器，如果不填，自动在 body 上创建覆盖全屏的层
  focusColor: '#e06555', // 当前选中的圆的颜色
  fgColor: '#d6dae5', // 未选中的圆的颜色
  bgColor: '#fff', // canvas背景颜色
  n: 3, // 圆点的数量： n x n
  innerRadius: 20, // 圆点的内半径
  outerRadius: 50, // 圆点的外半径，focus 的时候显示
  touchRadius: 70, // 判定touch事件的圆半径
  render: true, // 自动渲染
  customStyle: false, // 自定义样式
  minPoints: 4, // 最小允许的点数
};
