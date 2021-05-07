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

function create(num) {
    return function () {
        num = num * 2
        console.log(num)
    }
}

var double = create(5)
double()
double()
// 这是函数所具有的隐藏 [[scope]] 属性。


// 组件模式
const myModule = (function () {
    const apiKey = "123456789"

    return {
        displayKey() {
            console.log(apiKey)
        }
    }
})()

myModule.displayKey() // "123456789"

// 基础缓存和记忆化
const newID = (function () {
    let current = 0
    return function () {
        return ++current
    }
})()

newID() // 1
newID() // 2



const factorialMemo = (function () {
    const cache = {}
    return function factorial(n) {
        if (n === 1 || n === 0) {
            return 1
        } else if (cache[n]) {
            return cache[n]
        } else {
            cache[n] = n * factorial(n - 1)
            return cache[n]
        }
    }
})()


factorialMemo(5) //120
// cache object looks like {'2': 2, '3' : 6, '4' : 24, '5' : 120}
factorialMemo(6) // 6 * cached 120 


// 闭包是懒人的对象，对象是天然的闭包！