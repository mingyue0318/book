/*变量储存在那里
  程序需要什么时候调用它  
*/
// 作用域

/* 传统语言中
1.分词/词法分析
2.解析/语法分析
3.生成代码
*/

function foo(a) {
    console.log(a);
}

foo(2)

// foo() RSH
// foo(2) 2->LSH
// function foo(a) a->RSH
// console RSH 检查是否存在log()
// console.log(a) a->RSH 

function foo(a) {
    var b = a;
    return a + b;
}
var c = foo(2);

// LSH
// a -> 2
// c -> foo
// b -> a

// RSH
// foo(2) -> 2
// b = a -> a
// return a + b -> a
// return a + b -> b


















