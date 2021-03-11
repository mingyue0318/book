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
} {
    for (var v of something) {
        console.log(v);

        if (v > 500) {
            break;
        }
    }
    for (var ret;
        (ret = something.next()) && !ret.done;) {
        console.log(ret.value)

        if (ret.value > 500) {
            break;
        }
    }
} {
    for (var item in obj) {

    }

    for (var key of Object.keys(obj)) {

    }
} {
    // iterable
    一个可以在其值上迭代的迭代器对象

    function* something() {
        try {
            var nextVal;
            while (true) {
                if (nextVal === undefined) {
                    nextVal = 1
                } else {
                    nextVal = (3 * nextVal) + 6
                }
                yield nextVal
            }
        } finally {
            console.log("clearing up!")
        }
    }
    var it = something()
    for (var k of it) {
        console.log(k);
        if (v > 500) {
            console.log(it.return("Hello World!").value);
        }
    }
}

{
    // 生成器  异步  回调
    function foo(x, y, cb) {
        ajax('http://some.url.1/?x=' + x + '&y' + y, cb)
    }


    foo(11, 12, function (err, text) {
        if (err) {
            console.error(err);
        } else {
            console.log(text)
        }

    })

} {
    function foo(x, y) {
        ajax('http://some.url.1/?x=' + x + '&y' + y, function (err, data) {
            if (err) {
                it.throw(err);
            } else {
                it.next(data) //酷
            }
        })
    }

    function* main() {
        try {
            var text = yield foo(11, 31); // 精髓
            console.log(text);
        } catch (err) {
            console.error(err);
        }
    }
    var it = main();

    it.next()
} {
    function* main() {
        var x = yield 'Hello World!';
        console.log(x);
    }

    var it = main();
    it.next()
    try {
        it.throw('Oops!')
    } catch (err) {
        console.log('err', err)
    }
}


function ajax(url, resolve) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url)

    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            resolve(xhr.responseText)
        }
    }
}
// 生成器 + Promise
function request(url) {
    return new Promise(function (resolve, reject) {
        ajax(url, resolve)
    })
} 
{
    request('http://some.url.1/')
        .then(function (response1) {
            return request('http://some.url.2/?v=' + response1)
                .then(function (response2) {
                    console.log(response2)
                })
        })
}

function run(gen) {
    var args = [].slice.call(arguments, 1),
        it;
    // 在当前上下文中初始化生成器
    it = gen.apply(this, args);
    // 返回一个promise用于生成器完成
    return Promise.resolve()
        .then(function handleNext(value) {
            // 对下一个yield出的值运行
            var next = it.next(value);
            return (function handleResult(next) {
                // 生成器运行完毕了吗？
                if (next.done) {
                    return next.value;
                }
                // 否则继续运行
                else {
                    return Promise.resolve(next.value)
                        .then(
                            // 成功就恢复异步循环，把决议的值发回生成器
                            handleNext,
                            // 如果value是被拒绝的 promise，
                            // 就把错误传回生成器进行出错处理
                            function handleErr(err) {
                                return Promise.resolve(
                                        it.throw(err)

                                    )
                                    .then(handleResult);
                            }
                        );
                }
            })(next);
        });
}

{
    function* foo() {
        var r2 = yield request('http://some.url.2');
        var r3 = yield request('http://some.url.3/?v=' + r2);

        return r3
    }

    function* bar() {
        var r1 = yield request('http://some.url.1');

        var r3 = yield run(foo);

        console.log(r3);
    }

    run(bar);
} 
{
    function* foo() {
        var r2 = yield request("http://some.url.2");
        var r3 = yield request("http://some.url.3/?v=" + r2);
        return r3;
    }

    function* bar() {
        var r1 = yield request("http://some.url.1");
        // 通过 yeild* "委托"给*foo()
        var r3 = yield* foo();
        console.log(r3);
    }
    run(bar);
}
{
    var res = [];
    function *reqData(url){
        yield;

        res.push(data);
    }

    var it1 = reqData('http://some.url.1');
    var it2 = reqData('http://some.url.2');

    var p1 = it.next();
    var p2 = it.next();
}
{
    // 通信顺序进程
    runAll(function *(data){
        data.res = [];
        var url1 = yield 'http://some.url.2';

        var p1 = request(url1);
        yield;

        data.res.push(yield p1);
    },function*(data){
        var url2 = yield 'http://some.url.1';
        var p2 = request(url2);
        yield 
        data.res.push(yield p2);
    })
}

{
    request('http://some.url.1/')
        .then(function(response1){
                return request('http://some.url.2/?v='+response1)
                        .then(function(response2){
                                    console.log(response2)
                              })
             })
}

{
    function foo(x,y){
        return request('http://some.url.1/?x='+x+'&y='+y)
    };
    foo(11,13).then(function(text){
        console.log(text);
    },function(err){
        console.error(err);
    })
}
{
    function foo(x,y){
        return request('http://some.url.1/?x='+x+'&y='+y);
    }

    function *main(){
        try{
            var text = yield foo(11,13);
            console.log(text);
        }
        catch(err){
            console.error(err);
        }
    }

    var it = main();

    var p = it.next().value

    p.then(function(data){
        console.log(data);
    },function(err){
        console.log(err);
    })
}

{
    function run(gen){
        var args = [].slice.call(arguments,1),it;

        it = gen.apply(this.args);

        return Promise.resolve().then(function handleResult(value){
            var next = it.next(value);

            return (function handleNext(value){
                if(next.done){
                    return value;
                }
                else{
                    return Promise.resolve(next.value).then(handleNext,function handleError(err){
                        return Promise.reject(it.throw(err).then(handleResult))
                    })
                }
            })(next)
        })
    }
}

{

    function foo(x,y){
        return request('http://some.url.1/?x='+x+'&y='+y)
    };

    async function main() {
        try{
            var text = await foo(11,14);

        }
        catch(err){

        } 
    }
    main()

}

{
    function *foo(){
        var r1 =yield request('http://some.url.1/');
        var r2 =yield request('http://some.url.2/');
        var r3 =yield request('http://some.url.2/?v='+r1 +','+r2);

        console.log(r3);
    }
}
{
    function *foo(){
        var r1 = request('http://some.url.1/');
        var r2 = request('http://some.url.2/');

        var p1 = yield r1;
        var p2 = yield r2;

        var r3 =yield request('http://some.url.2/?v='+p1 +','+p2);

    }
}
{
    function *foo(){
        var results =yield Promise.all([request('http://some.url.1/'),request('http://some.url.2/')]);

        // var r1 = results[0];
        // var r2 = results[1];
        var [r1,r2] = results;

        var r3 =yield request('http://some.url.2/?v='+r1 +','+r2);

    }
}


run(foo);
