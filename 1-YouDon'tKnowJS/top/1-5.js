function foo(){
    var a = 2 ;
    function bar(){   // 词法作用域外执行
        console.log(a)
    }

    return bar
}

var baz = foo()

baz()


/*------------------*/

function foo(){
    var a = 2;
    function bar(){
        console.log(a)
    }
    baz(bar)
}

function baz(fn){
    fn()
}



var fn;

function foo(){
    var a = 2;
    function bar(){
        console.log(a)
    }

    fn = bar;
}

function bar(){
    fn()
}

foo()

bar()


function wait(message){
    setTimeout(function timer(){
        console.log(message);
    },1000)
}


wait('Hello World!')



function setupBot(name,selector){
    $(selector).click(function activator(){
        console.log(name)
    })
}


setupBot('Closure Bot 1','#bot_1')
setupBot('Closure Bot 2','#bot_2r')






(
    function(){
    console.log(111)
})()