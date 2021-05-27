function foo(a) {
    var b = a;
    function bar(c) {
        console.log(a, b, c);
    }
    bar(b * 3);
}

foo(2);

// eval

function foo(str,a){
    eval(str) 
    console.log(a,b);
}
var b = 2;
foo('var b=3',1)

/**********/ 
var obj = {
    a:1,
    b:2,
    c:3
}

with(obj){
    a = 2;
    b = 3;
    c = 4;
}

/**********/ 
function foo(obj){
    with(obj){
        a = 2
    }
}

var o1 = {
    a:3,
    c:4
}


var o2 = {
    b:3
}
foo( o1 )
console.log(o1.a) // 2
console.log(a)
foo(o2)

console.log(o2) // undefined
console.log(a)  // 2














