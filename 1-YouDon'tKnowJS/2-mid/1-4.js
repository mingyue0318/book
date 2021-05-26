{
    序列化
    
    document.all

    +new Date()

    ~a.indexOf('')

    Math.floor()
    x | 0
    ~~46.9
        负数有些许不同
    parseInt(1/0,19) // 18

    0,'',null,undefined,false


    [1] + {}
    {} 
        + []
}
{
    arr=[1,2,4]
    arr.reduce((total,num)=>{
        return total+num
    },0)

    Symbol
        类型转换缺乏一致性
}
{
    var i = 2
    Number.prototype.valueOf = function(){
        return i++
    }
    var a = new Number(42)

    if( a==2 && a == 3){
        console.log("Yep, this happened")
    }
}
{
    [] == ![] // true
    0 == "\n"; // true

    // 如果两边的值中有 true 或者 false，千万不要使用 ==。
    // 如果两边的值中有 []、"" 或者 0，尽量不要使用 ==。
}