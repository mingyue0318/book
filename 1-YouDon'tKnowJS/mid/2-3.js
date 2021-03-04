{
    function add(xPromise, yPromise) {
        // Promise.all([ .. ])接受一个promise数组并返回一个新的promise，
        // 这个新promise等待数组中的所有promise完成
        return Promise.all([xPromise, yPromise])
            // 这个promise决议之后，我们取得收到的X和Y值并加在一起
            .then(function (values) {
                // values是来自于之前决议的promisei的消息数组
                return values[0] + values[1];
            });
    }
    // fetchX()和fetchY()返回相应值的promise，可能已经就绪，
    // 也可能以后就绪
    add(fetchX(), fetchY())
        // 我们得到一个这两个数组的和的promise
        // 现在链式调用 then(..)来等待返回promise的决议
        .then(function (sum) {
            console.log(sum); // 这更简单！
        });
}
// Promise 决议后就是外部不可变的值，我们可以安全地把这个值传递给第三方，并确信它不会被有意无意地修改

{
    var rejectedPr = new Promise(function (resolve, reject) {
        resolve(Promise.reject('Oop'));
    })
    rejectedPr.then(
        function fulfilled() {

        },
        function reject(err) {
            console.log(err);
        }
    )
} {
    function fulfilled(msg) {
        console.log(msg)
    }

    function rejected(err) {
        console.error(err)
    }
    p.then(
        fulfilled,
        rejected
    );
} {
    var p = Promise.resolve(42);
    p.then(
        function fulfilled(msg) {
            // 数字没有string函数，所以会抛出错误
            console.log(msg.toLowerCase());
        },
        function rejected(err) {
            // 永远不会到达这里
        }
    );
}
// 没能有效使用 Promise API 真正构造出一个 Promise，那就无法得到一个被拒绝的 Promise ！

{
    //     默认情况下，Promsie 在下一个任务或时间循环 tick 上（向开发者终端）报告所有拒绝，
    // 如果在这个时间点上该 Promise 上还没有注册错误处理函数
    //         如果想要一个被拒绝的 Promise 在查看之前的某个时间段内保持被拒绝状态，可以调用
    // defer()，这个函数优先级高于该 Promise 的自动错误报告。
}

// Promise 错误处理

{
    // request(..)是一个支持Promise的Ajax工具
    // 就像我们在本章前面定义的一样
    var p1 = request("http://some.url.1/");
    var p2 = request("http://some.url.2/");
    Promise.race([p1, p2])
        .then(function (msg) {
            // p1或者p2将赢得这场竞赛
            return request(
                "http://some.url.3/?v=" + msg
            );
        })
        .then(function (msg) {
            console.log(msg);
        });
} {
    // foo()是一个支持Promise的函数
    // 前面定义的timeoutPromise(..)返回一个promise，
    // 这个promise会在指定延时之后拒绝
    // 为foo()设定超时
    Promise.race([
            foo(), // 启动foo() 
            timeoutPromise(3000) // 给它3秒钟
        ])
        .then(
            function () {
                // foo(..)按时完成！
            },
            function (err) {
                // 要么foo()被拒绝，要么只是没能够按时完成，
                // 因此要查看err了解具体原因
            }
        );
} {
    var p1 = Promise.resolve(21);
    var p2 = Promise.resolve(42);
    var p3 = Promise.reject("Oops");
    // 把列表中的值加倍，即使是在Promise中
    Promise.map([p1, p2, p3], function (pr, done) {
            // 保证这一条本身是一个Promise 
            Promise.resolve(pr)
                .then(
                    // 提取值作为v 
                    function (v) {
                        // map完成的v到新值
                        done(v * 2);
                    },
                    // 或者map到promise拒绝消息
                    done
                );
        })
        .then(function (vals) {
            console.log(vals); // [42,84,"Oops"] 
        });
}

// 局限性

// 单一值
{
    function getY(x) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve((3 * x) - 1);
            }, 100);
        })
    }

    function foo(bar, baz) {
        var x = bar * baz;
        return getY(x).then(function (y) {
            return [x, y];
        })
    }
    foo(10, 20).then(function (msgs) {
        var x = msgs[0];
        var y = msgs[1];

        console.log(x, y);
    })
} {
    function foo(bar, baz) {
        var x = bar * baz;

        return [Promise.resolve(x), getY(x)]
    }

    Promise.all(foo(10, 20)).then(function (msgs) {
        var x = msgs[0];
        var y = msgs[1];

        console.log(x, y);
    })
}
// 展开/传递参数

{
    function spread(fn) {
        return Function.apply.bind(fn, null);
    }
    Promise.all(
            foo(10, 20)
        )
        .then(
            spread(function (x, y) {
                console.log(x, y); // 200 599 
            })
        )
} {
    // 单决议
    {
        // click(..)把"click"事件绑定到一个DOM元素
        // request(..)是前面定义的支持Promise的Ajax 
        var p = new Promise(function (resolve, reject) {
            click("#mybtn", resolve);
        });
        p.then(function (evt) {
                var btnID = evt.currentTarget.id;
                return request("http://some.url.1/?id=" + btnID);
            })
            .then(function (text) {
                console.log(text);
            });
    }
} {
    // 惯性
    {
        function foo(x, y, cb) {
            ajax(
                "http://some.url.1/?x=" + x + "&y=" + y,
                cb
            );
        }
        foo(11, 31, function (err, text) {
            if (err) {
                console.error(err);
            } else {
                console.log(text);
            }
        });
    }
    {
        if(!Promise.wrap){
            Promise.wrap = function(fn){
                return function(){
                    var args = [].slice.call(arguments);
                    return new Promise(function (resolve,reject) {
                        fn.apply(
                            null,
                            args.concat(function (err,v) {
                                if(err){
                                    reject(err);
                                }else{
                                    resolve(v);
                                }
                            })
                        )
                    })
                }
            }
        }
    }
}