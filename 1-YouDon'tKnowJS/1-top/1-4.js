{
    console.log(a)
    var a = 2
}

foo()

var foo;

function foo(){
    console.log(1)
}

foo = function(){
    console.log(2)
}


/*----------------*/

function foo() {
    console.log(1)
}
foo()

foo = function (){
    console.log(2)
}


foo()

function foo(){
    console.log(1)
}

foo = function (){
    console.log(3)
}
function foo(){
    console.log(2)
}

