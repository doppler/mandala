import React from 'react';
import ReactDOM from 'react-dom';

const fibonacciSequence = (n) => {
  let arr = [2, 3];
  for (let i = 2; i < n + 1; i++) {
    arr.push(arr[i - 2] + arr[i - 1]);
  }
  return arr;
};

const seq = fibonacciSequence(12).reverse();
const center = seq[0] / 2;
const baseHue = 270;

const App = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={seq[0]} height={seq[0]}>
      {seq.map((n, i) => (
        <circle
          cx={center}
          cy={center}
          r={n / 2}
          stroke={`hsl(${(360 / seq[0]) * n + baseHue}, 100%, 50%)`}
          fill={`hsla(${(360 / seq[0]) * n + baseHue}, 100%, 50%, 0.075)`}
        />
      ))}
    </svg>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
