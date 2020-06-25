import React from 'react';
import ReactDOM from 'react-dom';

const fibonacciSequence = (n) => {
  let arr = [2, 3];
  for (let i = 2; i < n + 1; i++) {
    arr.push(arr[i - 2] + arr[i - 1]);
  }
  return arr;
};

const seq = fibonacciSequence(12).slice(3).reverse();
const center = seq[0] / 2;
const radius1 = center;
const baseHue = 270;

const coordsFromAngleAndRadius = (angle, radius) => {
  return {
    x: center + (radius * Math.cos(angle * Math.PI / 180)),
    y: center + (radius * Math.sin(angle * Math.PI / 180)),
  }
}

const Mandala = () => {
  return (
    <>
      <svg xmlns='http://www.w3.org/2000/svg' width={seq[0]} height={seq[0]}>
        <BaseCircles />
        <OuterPetals />
      </svg>
    </>
  );
};

const BaseCircles = () => seq.map((n, i) => (
  <circle key={n}
    cx={center}
    cy={center}
    r={n / 2}
    stroke={`hsl(${(360 / seq[0]) * n + baseHue}, 100%, 50%)`}
    fill={`hsla(${(360 / seq[0]) * n + baseHue}, 100%, 50%, 0.075)`}
  />
))

const OuterPetals = () => {
  const coordsArr = []
  for (let angle = -90; angle <= (360 - 90); angle += 18) {
    const { x, y } = coordsFromAngleAndRadius(angle, angle % 36 === 0 ? seq[1] / 2 : seq[0] / 2);
    coordsArr.push({ x, y })
  }
  const pathArr = [`M ${coordsArr[0].x} ${coordsArr[0].y}`]
  coordsArr.splice(1).forEach(({ x, y }) => {
    pathArr.push(`L ${x} ${y}`)
  })
  return (
    <g>
      <path d={pathArr.join(' ')} stroke={`hsl(${baseHue}, 100%, 50%)`} fill='none' />
    </g>
  )
}
ReactDOM.render(<Mandala />, document.getElementById('root'));
