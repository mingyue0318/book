{
    null;
    undefined;
    string;
    number;
    boolean
    object
    symbol
}

{
    var a = null;
    (!a && typeof a === "object"); // true


    typeof function a(){ /* .. */ } === "function"; // true

    function foo(b,c){}
    foo.length // 2
}

{
    a["13"] = 42;
    a.length; // 14
    Array.from()
}
{
    // 数组
}
{
    // 字符串
    a.charAt(1)
    a.toUpperCase()
    a.split('').reverse().join()
}
{
    // 数组+字符串
    indexOf()
    concat()
    length
}
{

    var num = 1234
    num.toExponential()
    num.toFixed()
}
{
    Number.EPSILON ;//比较两个数字相等
    void 0//并不影响表达式的结果 只是不返回值
    Number.isNaN()
    0 
        Number(n) === 0 && 1/Number(0) === -Infinity
    Object.is(a,b) //判断两值是否绝对性相等


}

{
    function foo(x){
        x.push(x);
        console.log(x);
        x = [4,5,6];
        x.push(7)
        console.log(x)
    }
    var a = [1,2,3];
    foo(x);
    a // [1,2,3,4]
}
{
    function foo(x){
        x.push(x);
        console.log(x);
        x.length = 0;
        x.push(4,5,6,7)
        console.log(x)
    }
    var a = [1,2,3];
    foo(x);
    a // [4,5,6,7]
}

