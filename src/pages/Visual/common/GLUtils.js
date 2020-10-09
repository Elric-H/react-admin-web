import Tess2 from 'tess2';

// 顶点着色器
const vertex = `
        attribute vec2 position;
        varying vec3 color;

        void main() {
          gl_PointSize = 1.0;
          color = vec3(0.5 + position * 0.5, 0.0);
          gl_Position = vec4(position, 1.0, 1.0);
        }
      `;

// 片元着色器
const fragment = `
        precision mediump float;
        varying vec3 color;

        void main() {
          gl_FragColor = vec4(color, 1.0);
        }
      `;

const renderWebGL = (gl, points, mode) => {
  // 分别创建顶点、片元着色器的shader对象
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertex);
  gl.compileShader(vertexShader);

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragment);
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
  // 调用drawArrays传入绘图模式,根据传入的图元进行绘制
  // gl.POINTS: 绘制一系列点。
  // gl.LINE_STRIP: 绘制一个线条。即，绘制一系列线段，上一点连接下一点。
  // gl.LINE_LOOP: 绘制一个线圈。即，绘制一系列线段，上一点连接下一点，并且最后一点与第一个点相连。
  // gl.LINES: 绘制一系列单独线段。每两个点作为端点，线段之间不连接。
  // gl.TRIANGLE_STRIP：绘制一个三角带。
  // gl.TRIANGLE_FAN：绘制一个三角扇。
  // gl.TRIANGLES: 绘制一系列三角形。每三个点作为顶点。如果顶点的个数n不是3的倍数，那么最后的1个或者2个顶点会被忽略
  // count： 指定绘制需要使用到多少个点。（一个点需要横纵坐标构成，所以points除以2才能得到一个点）
  gl.drawArrays(mode, 0, points.length / 2);
};

/**
 * 使用Tess2对几何图形进行三角剖分，返回剖分之后的数组（每三个一组）
 * @param points
 * @returns {[]}
 */
const getTriangles = (points) => {
  const res = Tess2.tesselate({
    contours: [points],
    windingRule: Tess2.WINDING_NONZERO,
    elementType: Tess2.POLYGONS,
    polySize: 3,
    vertexSize: 2,
  });
  const triangle = [];
  for (let i = 0; i < res.elements.length; i += 3) {
    const a = res.elements[i];
    const b = res.elements[i + 1];
    const c = res.elements[i + 2];
    triangle.push(
      res.vertices[a * 2],
      res.vertices[a * 2 + 1],
      res.vertices[b * 2],
      res.vertices[b * 2 + 1],
      res.vertices[c * 2],
      res.vertices[c * 2 + 1],
    );
  }
  return triangle;
};

/**
 * 根据三角剖分的结果获取所有点的线段
 * @param points
 * @returns {[]}
 */
const getTrianglesLines = (points) => {
  const triangle = getTriangles(points);
  const lines = [];
  for (let i = 0; i < triangle.length; i += 6) {
    const a = [triangle[i], triangle[i + 1]];
    const b = [triangle[i + 2], triangle[i + 3]];
    const c = [triangle[i + 4], triangle[i + 5]];
    lines.push(...a, ...b, ...a, ...c, ...b, ...c);
  }
  return lines;
};

export { renderWebGL, getTriangles, getTrianglesLines };
