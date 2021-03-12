String.prototype.replaceAll
Promise.any
WeakRef
逻辑赋值运算符
数字分隔符


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