
// ES6（2015）

// 1.class 类

class Man {
    constructor(name){
        this.name = name
    }
    console(){
        console.log(this.name)
    }
}

var man = new Man('小豪')
man.console()

// 2 模块化

// 模块 A 导出一个方法
export const sub = (a,b) => a+b
// 模块 B 导入使用
import {sub} from './A'
console.log(sub(1,2))

// 3 箭头（Arrow）函数
const func = (a, b) => a + b;
func(1, 2); // 3


// 4. 函数参数默认值
function foo (age = 25){}

// 5 模板字符串
const name = '小豪';
const str = `Your name is ${name}`;

// 6. 解构赋值
let a = 1, b= 2;
[a, b] = [b, a]; // a 2  b 1

// 7. 延展操作符
let a = [...'hello world']; // ["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"]

// 8. 对象属性简写
const name='小豪',
const obj = { name };

// 9. Promise

Promise.resolve().then(() => { console.log(2); });
console.log(1);
// 先打印 1 ，再打印 2

// 10. let和const

let name = '小豪'
const arr = [];


// ------------------函数特性
// https://mp.weixin.qq.com/s/ZdwwOI9vNdBeO3Q7jx-v-w


// ES7 (2016)
// 1. Array.prototype.includes()
[1].includes(1); // true
// 2. 指数操作符
2**10; // 1024

// ES8（2017）

// 1. async/await 异步终极解决方案


async function getData(){
    const res = await api.getTableData(); // await 异步任务
    // do something    
}

// 2. Object.values()
Object.values({a: 1, b: 2, c: 3}); // [1, 2, 3]

// 3. Object.entries()
Object.entries({a: 1, b: 2, c: 3}); // [["a", 1], ["b", 2], ["c", 3]]

// 4. String padding
// padStart
'hello'.padStart(10); // "     hello"
// padEnd
'hello'.padEnd(10)// "hello     "

// 5. 函数参数列表结尾允许逗号
// 6. Object.getOwnPropertyDescriptors()  获取一个对象的所有自身属性的描述符,如果没有任何自身属性，则返回空对象。
// 7. SharedArrayBuffer对象
// SharedArrayBuffer 对象用来表示一个通用的，固定长度的原始二进制数据缓冲区，
/**
 * 
 * @param {*} length 所创建的数组缓冲区的大小，以字节(byte)为单位。  
 * @returns {SharedArrayBuffer} 一个大小指定的新 SharedArrayBuffer 对象。其内容被初始化为 0。
 */
 new SharedArrayBuffer(10)
//  8. Atomics对象
//  Atomics 对象提供了一组静态方法用来对 SharedArrayBuffer 对象进行原子操作。

// ES9（2018）

// 1. 异步迭代

// await可以和for...of循环一起使用，以串行的方式运行异步操作
async function process(array) {
    for await (let i of array) {
      // doSomething(i);
    }
}
// 2. Promise.finally()
Promise.resolve().then().catch(e => e).finally();
// 3. Rest/Spread 属性
const values = [1, 2, 3, 5, 6];
console.log( Math.max(...values) ); // 6

// 4. 正则表达式命名捕获组

const reg = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
const match = reg.exec('2021-02-23');

// 5. 正则表达式反向断言
// (?=p)、(?<=p)  p 前面(位置)、p 后面(位置)
// (?!p)、(?<!p>) 除了 p 前面(位置)、除了 p 后面(位置)
// (?<=w)

// 6. 正则表达式dotAll模式
// 正则表达式中点.匹配除回车外的任何单字符，标记s改变这种行为，允许行终止符的出现
/hello.world/.test('hello\nworld'); // false


// ES10（2019）
// 1. Array.flat()和Array.flatMap()
[1, 2, [3, 4]].flat(Infinity); // [1, 2, 3, 4]
[1, 2, 3, 4].flatMap(a => [a**2]); // [1, 4, 9, 16]

// 2. String.trimStart()和String.trimEnd()
// 去除字符串首尾空白字符

// 3. String.prototype.matchAll

const raw_arr = 'test1  test2  test3'.matchAll((/t(e)(st(\d?))/g));
const arr = [...raw_arr];

// 4. Symbol.prototype.description
// 只读属性，回 Symbol 对象的可选描述的字符串。
Symbol('description').description; // 'description'

// 5. Object.fromEntries()

// 通过 Object.fromEntries， 可以将 Map 转化为 Object:
const map = new Map([ ['foo', 'bar'], ['baz', 42] ]);
console.log(Object.fromEntries(map)); // { foo: "bar", baz: 42 }
// 6. 可选 Catch

// ES11（2020）
// 1. Nullish coalescing Operator(空值处理)
let user = {
    u1: 0,
    u2: false,
    u3: null,
    u4: undefined,
    u5: '',
}
let u2 = user.u2 ?? '用户2'  // false
let u3 = user.u3 ?? '用户3'  // 用户3
let u4 = user.u4 ?? '用户4'  // 用户4
let u5 = user.u5 ?? '用户5'  // ''

// 2. Optional chaining（可选链）
let user = {}
let u1 = user.childer.name // TypeError: Cannot read property 'name' of undefined
let u1 = user.childer?.name // undefined

// 3. Promise.allSettled
// 返回一个在所有给定的promise已被决议或被拒绝后决议的promise，并带有一个对象数组，每个对象表示对应的promise结果

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => reject('我是失败的Promise_1'));
const promise4 = new Promise((resolve, reject) => reject('我是失败的Promise_2'));
const promiseList = [promise1,promise2,promise3, promise4]
Promise.allSettled(promiseList)
.then(values=>{
  console.log(values)

  
});

// 4. import()

// 按需导入
// 5. 新基本数据类型BigInt
// 任意精度的整数
// 6. globalThis

// 浏览器：window
// worker：self
// node：global



// ----------------------------------------------
// ES2021

String.prototype.replaceAll
Promise.any
WeakRef
逻辑赋值运算符
数字分隔符
Finalizers = FinalizationRegistry


// String.prototype.replaceAll

const str = '123436';
const _str = str.replace(/3/g, '0')
console.log(_str);


const newStr = '121212';
const _newStr = newStr.replaceAll('2', 0)
console.log(_newStr)


Promise.any


// Promise.any 方法和 Promise.race 类似——只要给定的迭代中的一个 promise 成功，就采用第一个 promise 的值作为它的返回值，但与 Promise.race 的不同之处在于——它会等到所有 promise 都失败之后，才返回失败的值：



WeakRef

// 可以通过 WeakRef 类来给某个对象创建一个弱引用
// 可以通过 FinalizationRegistry 类，在某个对象被垃圾回收之后，执行一些自定义方法

function toogle(element) {
    const weakElement = new WeakRef(element);
    let intervalId = null;

    function toggle() {
        const el = weakElement.deref();
        if (!el) {
            return clearInterval(intervalId);
        }
        const decoration = weakElement.style.textDecoration;
        const style = decoration === 'none' ? 'underline' : 'none';
        decoration = style;
    }
    intervalId = setInterval(toggle, 1000);
}
const element = document.getElementById("link");
toogle(element);
setTimeout(() => element.remove(), 10000);


// 逻辑赋值运算符  

// ||=
// &&=

// 或等于
// |   a   |   b   | a ||= b | a (运算后) |
// | true  | true  |   true  |        true         |
// | true  | false |   true  |        true         |
// | false | true  |   true  |        true         |
// | false | false |   false |        false        |
// a ||= b
// // 等同于:
// a || (a = b);

// // 且等于
// |   a   |   b   | a &&= b | a (运算后) |
// | true  | true  |   true  |        true         |
// | true  | false |   false |        false        |
// | false | true  |   false |        false        |
// | false | false |   false |        false        |
// a &&= b
// // 等同于:
// a && (a = b);


// 数字分隔符

1_000_000_000           // 十亿
101_475_938.38 

// FinalizationRegistry

// 创建 FinalizationRegistry:
const reg = new FinalizationRegistry((val) => {
    console.log(val)
  })
  
  ;(() => {
    // 创建新对象:
    const obj = {}
  
    //为 “obj” 对象注册 finalizer：
    //第一个参数：要为其注册 finalizer 的对象。
    //第二个参数：上面定义的回调函数的值。
    reg.register(obj, 'obj has been garbage-collected.')
  })()
  // 当 "obj" 被gc回收时输出：
  // 'obj has been garbage-collected.'