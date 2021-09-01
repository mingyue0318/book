//1. spread/rest -> ...

展开
  iterable 
// ...
//  代替
//     concat
收集
    function foo(...arg){
        console.log(arg)
    }

    foo(1,2,3,4,5) //[1,2,3,4,5]  "rest参数"
    

    function bar(x,y,...z){
        console.log(x,y,z)
    }
    bar(1,2,3,4,5)   // 1,2,[3,4,5]




// 2.默认参数值
// 普通
function foo(x,y){
    x = x || 11;
    y = y || 14;
    console.log(x+y);
}
// 升级
function foo1(x,y){  // 排除 x=0
    x = (x!=undefined)?x:11;
    y = (y!=undefined)?y:14;
    console.log(x+y);
}

// 函数无法判断 undefined 和 缺失

// ES6
function foo2(x=11,y=14){
    console.log(x+y);
}

// 默认参数表达式

// 函数生命中形势参数实在他们自己的作用域中 而不是函数体作用域中

// eg
var w=1,z=2
function foo3(x=w+1,y=x+1,z=z+1){
    console.log(x,y,z);
}
foo3() //ReferenceError

// 3 解构
解构化赋值

// 省略的是x:部分
{
    function foo(){
        return [1,2,3];
    }
    function bar(){
        return {
            x:4,y:5,z:6
        }
    }
    console.log(foo())

    console.log(1111)


    // 一般
    // target: source
    // 解构
    //  source： target

    ({x,y,z} = bar()) // 未定义加（）

    // 创建对象映射/变换
}

{
    // 箭头函数
        继承自父层的东西
        {
            this
            arguments
            new.target
            super.xxx
        }
     

        // 
        
        

}