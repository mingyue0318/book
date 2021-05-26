{
    var anotherObject = {
        a: 2
    }
    var myObject = Object.create(anotherObject);

    console.log(myObject.a)
    console.log(anotherObject.a)
    console.log(anotherObject.hasOwnProperty('a'))
    console.log(myObject.hasOwnProperty('a'))

    myObject.a++

    console.log(myObject.a)
    console.log(anotherObject.a)
} {
    // 为什么一个对象需要关联到另一个对象










    function Foo() {
        /*....*/ }
    var a = new Foo()
    Object.getPrototypeOf(a) === Foo.prototype // true

    // 调用new  Foo()时会创建a
    // 其中的一步就是给a一个内部的[[Prototype]]链接，关联到Foo.prototype指向的那个对象

    // 继承意味着复制操作，JavaScript（默认）并不会复制对象属性
    // 委托（参见第6章）这个术语可以更加准确地描述JavaScript中对象的关联机制

    // Foo.prototype默认（在代码中第一行声明时！）有一个公有并且不可枚举（参见第3章）的属性.constructor


} {
    function Foo() {}

    Foo.prototype = {
        /*...*/ }

    var a = new Foo()
    a.constructor === Foo // false
    a.constructor === Object // true
} {
    function Foo(name) {
        this.name = name
    }
    Foo.prototype.myName = function () {
        return this.name
    }

    function Bar(name, label) {
        Foo.call(this, name)
        this.label = label
    }

    Bar.prototype.myLabel = function () {
        return this.label
    }

    Bar.prototype = Object.create(Foo.prototype)

    var a = new Bar('a', 'obj a')

    a.myName() // a
    a.myLabel() // obj a
} {
    a instanceof Foo
    // instanceof回答的问题是：在a的整条[[Prototype]]链中是否有指向Foo.prototype的对象 ----并不准确
    // 方法1
    function isRelatedTo(o1, o2) {
        function F() {}
        F.prototype = o2;
        return o1 instanceof F;
    }
    var a = {};
    var b = Object.create(a);
    // 方法2
    Foo.prototype.isPrototypeOf(a)

    // b是否出现在c的[[Prototype]]链中？
    b.isPrototypeOf( c );

    Object.getPrototypeOf( a ) === Foo.prototype; 

    a.__proto__ === Foo.prototype; // true

    // .__proto__的实现大致上是这样的:
    Object.defineProperty(Object.prototype,'__proto__',{
        get:function(){
            return Object.getPrototypeOf(this)
        },
        set: function(o){
            Object.setPrototypeOf(this,o)
            return o
        }
    })
}