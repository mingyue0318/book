function foo() {
    var a = 2;

    function bar() { // 词法作用域外执行
        console.log(a)
    }

    return bar
}

var baz = foo()

baz()


/*------------------*/

function foo() {
    var a = 2;

    function bar() {
        console.log(a)
    }
    baz(bar)
}

function baz(fn) {
    fn()
}



var fn;

function foo() {
    var a = 2;

    function bar() {
        console.log(a)
    }

    fn = bar;
}

function bar() {
    fn()
}

foo()

bar()


function wait(message) {
    setTimeout(function timer() {
        console.log(message);
    }, 1000)
}


wait('Hello World!')



function setupBot(name, selector) {
    $(selector).click(function activator() {
        console.log(name)
    })
}


setupBot('Closure Bot 1', '#bot_1')
setupBot('Closure Bot 2', '#bot_2r')






(
    function () {
        console.log(111)
    })()

{
    for (var i = 1; i <= 5; i++) {
        (function () {
            setTimeout(function timer() {
                console.log(i);
            }, i * 1000);
        })();
    }
} {
    for (var i = 1; i <= 5; i++) {
        (function (j) {
            setTimeout(function timer() {
                console.log(j);
            }, j * 1000);
        })(i);
    }
}

{
    function foo() {
        var something = "cool";
        var another = [1, 2, 3];

        function doSomething() {
            console.log(something);
        }

        function doAnother() {
            console.log(another.join(" ! "));
        }
    }

    function CoolModule() {
        var something = "cool";
        var another = [1, 2, 3];

        function doSomething() {
            console.log(something);
        }

        function doAnother() {
            console.log(another.join(" ! "));
        }
        return {
            doSomething: doSomething,
            doAnother: doAnother
        };
    }
    var foo = CoolModule();
    foo.doSomething(); // cool foo.doAnother(); // 1 ! 2 ! 3
}

{
    var MyModules = (function Manager() {
        var modules = {};

        function define(name, deps, impl) {
            for (var i = 0; i < deps.length; i++) {
                deps[i] = modules[deps[i]];
            }
            modules[name] = impl.apply(impl, deps);
        }

        function get(name) {
            return modules[name];
        }

        function set() {
            return modules
        }
        return {
            define: define,
            get: get,
            set: set
        };
    })();


    MyModules.define('bar', [], function () {
        function hello(who) {
            return "Let me introduce: " + who;
        }
        return {
            hello: hello
        }
    })

    MyModules.define("foo", ["bar"], function (bar) {
        console.log(8888, bar)
        var hungry = "hippo";

        function awesome() {
            console.log(bar.hello(hungry).toUpperCase());
        }
        return {
            awesome: awesome
        };
    });

    // console.log(MyModules.set())
    // // var bar = MyModules.get("bar");
    // var foo = MyModules.get("foo");
    // // console.log(bar.hello("hippo")); // Let me introduce: hippo
    // foo.awesome(); // LET ME INTRODUCE: HIPPO
}



{
    function foo() {
        console.log(a); // 3（不是 2 ！） 
    }

    function bar() {
        var a = 3;
        foo();
    }
    var a = 2;
    bar();
} {
    var obj = {
        id: "awesome",
        cool: function coolFn() {
            console.log(this)
            console.log(this.id);
        }
    };
    var id = "not awesome"
    obj.cool(); // 酷 setTimeout( obj.cool, 100 ); // 不酷
    setTimeout( obj.cool, 100 ); // 不酷
}
{
    let foo = {
        count:0,
        cool: function coolFn(){
            if(this.count<1){
                setTimeout(function(){
                    this.count++;
                    console.log('56789')
                }.bind(this),100)
            }
        }
    }

}