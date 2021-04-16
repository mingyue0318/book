const firstPromise = new Promise((res, rej) => {
    setTimeout(res, 500, "one");
});

const secondPromise = new Promise((res, rej) => {
    setTimeout(res, 100, "two");
});

Promise.race([firstPromise, secondPromise]).then(res => console.log(res));


// Promise.race相当于赛跑得出第一名，promise同为异步，返回的结果套上了setTimeout，eventLoop规则中，setTimeout谁时间短谁先执行，它的结果先执行
// settimeout(callback,time,...params),从第三个参数开始，后面的参数都会传递给callback