{
    避免同步ajax

    控制台I/O
        var a = {
            index:1
        }
        console.log(a) //??
        
        a.index++
    
    setTimeout()
        会在时间点后把回调挂载到事件池后

    异步是现在还将来的时间间隙
    并行是能够同时进行的事情
}

{
    var res = []

    function response(data) {
        if(data.url === "http://some.url.1"){
            res[0] = data
        }
        if(data.url === "http://some.url.2"){
            res[1] = data
        }

    }


    ajax("http://some.url.1",response)
    ajax("http://some.url.2",response)
}
{
    var a,b;
    function foo(x){
        a = x*2;
        if(a&&b){
            baz()
        }
    }
    function bar(y) {
        b = y*2;
        if(a&&b){
            baz()
        }
    }

    function baz() {
        console.log(a+b)
    }
    ajax("http://some.url.1",foo)
    ajax("http://some.url.2",bar)
}

{
    var a;
    function foo(x){
        if(!a){
            a = x*2;
            baz()
        }
    }
    function bar(y){
        if(!a){
            a = y*2;
            baz()
        }
    }
    function baz() {
        console.log(a)
    }
    ajax("http://some.url.1",foo)
    ajax("http://some.url.2",bar)


}
{
    协作

    var res = []

    function response(data){
        var chunk = data.splice(0,1000);
        res = res.concat(
            chunk.map(val => val *2)
        )

        if(data.length>0){
            setTimeout(()=>{
                response(data);
            },0)
        }
    }
}