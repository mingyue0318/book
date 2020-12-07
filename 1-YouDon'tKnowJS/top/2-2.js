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
    function foo(something){
        return this.a +something
    }

    function bind(fn,obj){
        return function(){
            return fn.apply(obj,arguments);
        }
    }

    var obj ={
        a:2

    }
    var bar = bind(foo,obj)
    var b = bar(3)
}

{
    // 默认绑定
    // 隐式绑定
    // 显示绑定
    // new


    function foo(something){
        this.a = something
    }
    var obj1= {
        foo:foo
    }

    var obj2 = {}

    obj1.foo(2);
    console.log(obj1.a)

    obj1.call(obj2,3)
    console.log(obj2.a);

    var bar= new obj1.foo(4);
    console.log(bar.a)
    console.log(obj1.a)

}