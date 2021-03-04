{
    // 回调缺陷
    // 基于回调的异步不符合大脑对任务步骤的规划方式；
    // 由于控制反转，回调并不是可信任或可组合的。
} {
    var x = 1;

    function* foo() {
        x++;
        yield;
        console.log('x:' + x);
    }

    function bar() {
        x++;
    }
    var it = foo()
    it.next()
    console.log(x)
    bar();
    console.log(x);
    it.next()
    console.log(x);
} {
    function* foo(x, y) {
        return x * y;
    }

    var it = foo(6, 7)
    var res = it.next();
    console.log(res.value) //42


} {
    function* foo(x) {
        var y = x * (yield);
        return y
    }

    var it = foo(6)
    it.next();
    var res = it.next(7) // 7作为表达式 yield的替代

    res.value // 42
} {
    function* foo(x) {
        var y = x * (yield "Hello"); // <-- yield一个值！
        return y;
    }
    var it = foo(6);
    var res = it.next(); // 第一个next()，并不传入任何东西
    res.value; // "Hello" 
    res = it.next(7); // 向等待的yield传入7
    res.value; // 42
} {
    function* foo() {
        var x = yield 2;
        z++;
        var y = yield(x * z);
        console.log(x, y, z);
    }
    var z = 1;
    var it1 = foo();
    var it2 = foo();
    var val1 = it1.next().value; // 2 <-- yield 2 
    var val2 = it2.next().value; // 2 <-- yield 2 
    val1 = it1.next(val2 * 10).value; // 40 <-- x:20, z:2 
    val2 = it2.next(val1 * 5).value; // 600 <-- x:200, z:3 
    it1.next(val2 / 2); // y:300 
    // 20 300 3 
    it2.next(val1 / 4); // y:10 
    // 200 10 3
} {
    var a = 1;
    var b = 2;

    function* foo() {
        a++;
        yield;
        b = b * a;
        a = (yield b) + 3;
    }

    function* bar() {
        b--;
        yield;
        a = (yield 8) + b;
        b = a * (yield 2);
    }
} {
    function step(gen) {
        var it = gen();
        var last;
        return function () {
            last = it.next(last).value;
        }
    }
} {
    var gimmeSomething = (function () {
        var nextVal;
        return function () {
            if (nextVal === undefined) {
                nextVal = 1;
            } else {
                nextVal = (3 * nextVal) + 6;
            }
            return nextVal;
        }
    })
} {
    var something = (function () {
        var nextVal;
        return {
            [Symbol.iterator]: function () {
                return this
            },
            next: function () {
                if (nextVal === undefined) {
                    nextVal = 1;
                } else {
                    nextVal = (3 * nextVal) + 6;
                }
                return {
                    value: nextVal,
                    done: false
                }
            }
        }
    })
    something.next().value; // 1 
    something.next().value; // 9 
    something.next().value; // 33 
    something.next().value; // 105
}
{
    for(var v of something){
        console.log(v);

        if(v>500){
            break;
        }
    }
    for(var ret;(ret = something.next())&& !ret.done;){
        console.log(ret.value)

        if(ret.value>500){
            break;
        }
    }
}