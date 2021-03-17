// 1 什么是promise
// 异步编程的一种解决方案，比回调函数和事件更加的合理
// 异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数
// 可以解决异步问题，但本身并不是异步的


// 2.特点
// 对象的状态不受外界影响
//   pending  resolved rejected
// 一旦状态改变，就不会再变，任何时候都可以得到这个结果
// pending -> resolved
// pending -> rejected
// promise内部发生错误，不会影响到外部程序的执行
// 无法取消Promise
// 一旦新建它就会立即执行，无法中途取消。
// 其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
// 第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

// 用法
new Promise(() => {});
new Promise(); // 报错


let promise = new Promise((resolve, reject) => {
    // do something
    if (true) {
        // 将参数返回，供then方法使用
        resolve("value");
    } else {
        // 将参数返回，供then方法使用
        reject("error");
    }
});


promise.then(
    value => {
        // resolved时调用，value为resolve函数返回的参数
        console.log(value);
    },
    err => {
        // rejected时调用，err为reject函数返回的参数
        console.log(err);
    }
);

// 当then方法只有一个函数参数时，此时为resolved状态的回调方法
promise.then(value => {
    // 只有状态为resolved时才能调用，如果返回的是rejected状态，则报错 Uncaught (in promise) error
    console.log(value);
});


//   Promise 新建后就会立即执行，并且调用resolve或reject后不会终结 Promise

let promise = new Promise(function (resolve) {
    console.log("Promise");
    resolve();
    console.log("!!!")
});

promise.then(function () {
    console.log("resolved.");
});
console.log("Hi!");

// Promise
// !!!
// Hi!
// resolved


Promise.prototype.then()

// 1.当未传入参数时，then方法会返回一个新的，状态和原promise相同的promise

const promise = new Promise(resolve => {
    resolve("resolve");
});

let p = promise.then();
console.log(promise);
console.log(p);

// 2.上一个promise未被成功调用then方法时，返回的结果如情形1

const promise = new Promise((_, reject) => {
    reject("reject");
});
let a = promise.then(value => {
    console.log(value);
});

// 3 上一个promise被成功调用then方法时，返回一个`resolve(undefined)`的promise

const promise = new Promise((_, reject) => {
    reject("reject");
});
let a = promise.then(undefined, value => {
    console.log(value);
});
console.log(a);



const promise = new Promise(resolve => {
    resolve("resolve");
});

let p = promise.then(
    () =>
    new Promise(resolve => {
        resolve("resolve2");
    })
);
console.log(11, p);

//   Promise.prototype.catch()

// catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。

const promise = new Promise((_, reject) => {
    reject("reject");
});

promise
    .then(value => {
        console.log('then', value);
    })
    // 发生错误，或者reject时执行
    .catch(value => {
        console.log('catch', value);
    });

// 如果 Promise 状态已经变成resolved，再抛出错误是无效的。

const promise = new Promise(resolve => {
    resolve("resolve");
    throw new Error("fail");
});

promise.then(value => console.log(value));


// promise中所有没有被处理的错误都会冒泡到最后一个catch中

const promise = new Promise(resolve => {
    resolve("resolve");
});
promise
    .then(value => {
        console.log(value);
        throw new Error("fail1");
    })
    .then(() => {
        throw new Error("fail2");
    })
    .catch(value => {
        console.log(value);
    });

Promise.prototype.finally()


// finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。
// finally方法的回调函数不接受任何参数，这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果

const promise = new Promise(resolve => {
    resolve("resolve");
});
promise.finally(() => {
    console.log(11); // 11
});


promise.finally(() => {
    // do something
});

// 等同于
promise.then(
    result => {
        // do something
        return result;
    },
    error => {
        // do something
        throw error;
    }
);


// Promise.resolve()

Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))

// -----------------------------------------------------------------

const promise = new Promise(resolve => {
    resolve("resolve");
});
let p = Promise.resolve(promise);
console.log(p == promise); // true


// 参数是一个thenable对象

// thenable对象
let thenable = {
    then: function (resolve, reject) {
        resolve(42);
    }
};

let p1 = Promise.resolve(thenable);
p1.then(function (value) {
    console.log(value); // 42
});


// 参数不是具有then()方法的对象，或根本就不是对象

const p = Promise.resolve('Hello');
p.then(function (s) {
    console.log(s) // Hello
});

// 不带有任何参数

Promise.resolve()
// 相当于
new Promise(resolve => resolve(undefined))


// Promise.reject()

const promise = Promise.reject()
const p = new Promise((resolve, reject) => reject('出错'));


// Promise.all()   相当于 &&

const p = Promise.all([p1, p2, p3]);


// 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
// 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

let p2 = Promise.reject(2);
const promise = Promise.all([1, p2, 3]);

promise.then(value => {
    console.log(value);
}).catch(value => {
    console.log(value);
})

console.log(11, promise)


// 如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法


const p1 = new Promise(resolve => {
        resolve("hello");
    })
    .then(result => result)
    .catch(e => e);

const p2 = new Promise(() => {
        throw new Error("报错了");
    })
    .then(result => result)
    .catch(e => e); // p2实际上是catch返回的promise实例
Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(e => console.log(e));


// Promise.race()   只接收第一个结果终止
const p = Promise.race([p1, p2, p3]);
// 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数


// Promise.allSettled() 返回所有结果
// 只有等到所有这些参数实例都返回结果，不管是fulfilled还是rejected，包装实例才会结束，参数与Promise.all()方法一样

let p2 = Promise.reject(2);
let promise = Promise.allSettled([1, p2, 3]);
promise.then(value => {
    console.log(value); // [{status: "fulfilled", value: 1},{status: "rejected", reason: 2},{status: "fulfilled", value: 3}]
});
console.log(promise);


// Promise.any()   相当于 || 

// 只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；
// 如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。

let p1 = Promise.reject(1);
let p2 = Promise.reject(2);
let promise = Promise.any([p1, p2, 3]);
promise.then(value => {
  console.log(value); // 3
});
console.log(promise);




let p1 = Promise.reject(1);
let p2 = Promise.reject(2);
let promise = Promise.any([p1, p2]);
promise
  .then(value => {
  console.log(value);
})
  .catch(value => {
  console.log(value); // AggregateError: All promises were rejected
});
console.log(promise);


// Promise.try()


const f = () => console.log('now');
Promise.try(f);
console.log('next');

