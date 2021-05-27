{
    // 副作用
    1.

    function foo() {
        a = a + 1
    }
    var a = 1

    foo() // 结果：undefined 副作用：a的值被改变

    2.
    a++
    3.
    var obj = {
        a: 42
    };
    obj.a; // 42
    delete obj.a; // true
    obj.a; // undefined
    其副作用是属性被从对象中删除
} 
{
    foo: for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            // 如果j和i相等，继续外层循环
            if (j == i) {
                // 跳转到foo的下一个循环
                continue foo;
            }
            // 跳过奇数结果
            if ((j * i) % 2 == 1) {
                // 继续内层循环（没有标签的）
                continue;
            }
            console.log(i, j);
        }
    }
    //
}