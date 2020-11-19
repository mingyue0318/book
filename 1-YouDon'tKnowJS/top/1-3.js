function foo(a){
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


function doSomething(a){
    b = a + doSomethingElse(a*2)
    console.log(b*3)
}

function doSomethingElse(a){
    return a + 1
}
var b;
doSomething(2)

/********************************/

function doSomething(a){
    function doSomethingElse(a){
        return a + 1
    }
    var b = a + doSomethingElse(a*2)
    console.log(b*3)
}


/************************************/

var  a = 2;

(function(){
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