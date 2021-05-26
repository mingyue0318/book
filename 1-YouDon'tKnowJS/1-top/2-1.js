{
    function identify() {
        return this.name.toUpperCase();
    }

    function speak() {
        var greeting = "Hello, I'm " + identify.call(this);
        console.log(greeting);
    }
    var me = {
        name: "Kyle"
    };
    var you = {
        name: "Reader"
    };
    identify.call(me); // KYLE 
    identify.call(you); // READER 
    speak.call(me); // Hello, 我是 KYLE 
    speak.call(you); // Hello, 我是 READER
} {
    var me = {
        name: "Kyle"
    };
    var you = {
        name: "Reader"
    };

    function identify(context) {
        return context.name.toUpperCase()
    }

    function speak(context) {
        var greeting = "Hello, I'm " + identify(context);
        console.log(greeting);
    }
    identify(you)
    speak(me)
} {
    function foo(num) {
        console.log('foo:' + num);
        this.count++
    }
    foo.count = 0

    for (var i = 0; i < 10; i++) {
        if (i > 5) {
            foo(i)
        }
    }

    console.log(foo.count)
    console.log(count)
    console.log(window)
}

{
    function foo(num) {
        console.log("foo: " + num); 
        // 记录 foo 被调用的次数 
        // 注意，在当前的调用方式下（参见下方代码），this 确实指向 foo
        this.count++;
    }
    foo.count = 0;
    for(var i =0;i<10;i++){
        if(i>5){
            foo.call(foo,i)
        }
    }
    console.log(foo.count)
}
{
    function foo(){
        var a = 2;
        this.bar()
    }
    function bar(){
        console.log(this.a)
    }
    foo()
}
{
    function foo(){
        var a = 2;
        bar.call(foo)
    }
    function bar(){
        console.log(this.a)
    }
    foo()
}