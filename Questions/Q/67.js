console.log('running index.js'); // 2
import { sum } from './sum.js';  //会被提到最顶层
console.log(sum(1, 2)); // 3

// sum.js
console.log('running sum.js');  //1
export const sum = (a, b) => a + b;