{

    function baz() {
        // 当前调用栈是：baz 
        // 因此，当前调用位置是全局作用域 
        console.log("baz");
        bar(); // <-- bar 的调用位置 
    }

    function bar() {

        // 当前调用栈是 baz -> bar 
        // 因此，当前调用位置在 baz 中 
        console.log("bar");
        foo(); // <-- foo 的调用位置 
    }

    function foo() {
        // 当前调用栈是 baz -> bar -> foo 
        // 因此，当前调用位置在 bar 中 
        console.log("foo");
    }
    baz(); // <-- baz 的调用位置
}


{
    function foo() {
        console.log(this.a);
    }
    var obj = {
        a: 2
    };
    foo.call(obj); // 2

}

{
    function foo(something) {
        return this.a + something
    }

    function bind(fn, obj) {
        return function () {
            return fn.apply(obj, arguments);
        }
    }

    var obj = {
        a: 2

    }
    var bar = bind(foo, obj)
    var b = bar(3)
}

{
    // 默认绑定
    // 隐式绑定
    // 显示绑定
    // new


    function foo(something) {
        this.a = something
    }
    var obj1 = {
        foo: foo
    }

    var obj2 = {}

    obj1.foo(2);
    console.log(obj1.a)

    obj1.foo.call(obj2, 3)
    console.log(obj2.a);
    console.log(obj1.a);

    var bar = new obj1.foo(4);
    console.log(bar.a)
    console.log(obj1.a)

} {
    function foo(something) {
        this.a = something;
    }
    var obj1 = {};
    var bar = foo.bind(obj1);
    bar(2);
    console.log(obj1.a); // 2 
    var baz = new bar(3);
    console.log(obj1.a); // 2  
    console.log(baz.a); // 3
}

{
    if (!Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
            if (typeof this === 'function') {
                throw new TypeError("Function.prototype.bind - what is trying " + "to be bound is not callable")
            }
            var aArgs = Array.prototype.slice.call(arguments, 1);
            fToBind = this;
            fONP = function () {}
            fBound = function () {
                return fToBind.apply(
                    this instanceof fONP && oThis ? this : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments))
                )
            };
            fONP.prototype = this.prototype;
            fBound.prototype = new fONP();
            return fBound
        }
    }
} {
    // 例外绑定
    function foo() {
        console.log(this.a);
    }
    var a = 3
    foo.call(null) //3


} {
    // 被忽略的this、
    // 什么情况下你会传入null
    function foo(a, b) {
        console.log(a, b)
    }

    foo.apply(null, [2, 3])

    var bar = foo.bind(null, a)
    bar(b);

} {
    function foo(a, b) {
        console.log(a, b)
    }
    // 我们的DMZ空对象
    var ø = Object.create(null);
    // 把数组展开
    // ES6 ...[]
    foo.apply(ø, [2, 3])
    // 使用bind ke li huake li hua s
    var bar = foo.bind(ø, 2)
    bar(3)
} {
    if (!Function.prototype.softBind) {
        Function.prototype.softBind = function (obj) {
            var fn = this;
            var curried = [].slice.call(arguments, 1);
            var bound = function () {
                return fn.apply(
                    (!this || this === (window || global)) ? obj : this,
                    curried.concat.call(curried, arguments)
                )
            }
            bound.prototype = Object.create(fn.prototype)
            return bound
        }
    }

    function foo() {
        console.log("name: " + this.name);
    }
    var obj = {
            name: "obj"
        },
        obj2 = {
            name: "obj2"
        },
        obj3 = {
            name: "obj3"
        };
    var fooOBJ = foo.softBind(obj);
    fooOBJ(); // name: obj 
    obj2.foo = foo.softBind(obj);  
    obj2.foo(); // name: obj2 <---- 看！！！
    fooOBJ.call( obj3 ); // name: obj3 <---- 看！
    setTimeout( obj2.foo, 10 ); // name: obj   <---- 应用了软绑定  默认绑定
    
}