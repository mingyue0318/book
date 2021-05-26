function foo(a) {
    var b = 2;

    function bar() {

    }
    var c = 3
}

// 为什么 要 使用 函数

answer = `最小化信息暴露-最小特权`
/*

1.私有化-外部无法访问
2.规避冲突
*/


function doSomething(a) {
    b = a + doSomethingElse(a * 2)
    console.log(b * 3)
}

function doSomethingElse(a) {
    return a + 1
}
var b;
doSomething(2)

/********************************/

function doSomething(a) {
    function doSomethingElse(a) {
        return a + 1
    }
    var b = a + doSomethingElse(a * 2)
    console.log(b * 3)
}


/************************************/

var a = 2;

(function () {
    var a = 3;
    console.log(a)
})()

console.log(a)

// 匿名函数的缺点

/*
1.栈追踪困难 调试困难 
2.递归调用时无法使用
3.可读性差
*/


for (var i = 0; i < 10; i++) {
    console.log(i);
}

try {
    undefined()
} catch (err) {
    console.log(err)
}
console.log(err)


var foo = true;
if (foo) {
    let bar = foo * 2;
    bar = something(bar);
    console.log(bar);
}

try {
    throw 2;
} catch (a) {
    console.log(2)
}

// let (a=2) {
//     console.log(a)
// }

{
    console.log(foo);
    let foo = 2
}

function process(data) {

}

var someReallyBigDate = {
    /*...*/ }

process(someReallyBigDate);

var btn = document.getElementById('my_button');
btn.addEventListener('click', function click(evt) {
    console.log('btn click');
}, /*capturingPhase*/ false);


function process(data) {

} 
// 定义的内容完全可以销毁
{
    let someReallyBigDate = {
        /*...*/ }
    process(someReallyBigDate);
}

var btn = document.getElementById('my_button');
btn.addEventListener('click', function click(evt) {
    console.log('btn click');
}, /*capturingPhase*/ false);


