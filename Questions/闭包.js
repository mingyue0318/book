
// https://mp.weixin.qq.com/s/e-WuxcQwo2o3bQwsDw2NQw
// 1、预解析，找一些东西（var function 参数）；

// 2、逐行去解读代码。

let name = "John"

function greet() {
  const greeting = "Hi"

  function printHi() {
    console.log(greeting + ' ' + name)
  }
  printHi()
}

name = "Jane"

greet() // "Hi Jane"

// 即使在词法范围之外调用，仍可以记住它的词法范围

function create(num){
    return function (){
        num = num *2
        console.log(num)
    }
}

var double  = create(5)
double()
double()
// 这是函数所具有的隐藏 [[scope]] 属性。


// 组件模式

// 基础缓存和记忆化