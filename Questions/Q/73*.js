async function getData() {
  return await Promise.resolve("I made it!");
}

const data = getData();
console.log(data);


// 解析：全局执行上下文调用异步getData后，接着执行console.log。这是执行的顺序
// getData调用的结果是返回pending状态的Promise