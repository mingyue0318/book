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