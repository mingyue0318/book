{
    // 回调最大的问题是控制反转，它会导致信任链的完全断裂

    // 缺乏顺序性和可信任性
    function timeoutify(fn, delay) {
        var intv = setTimeout(function () {
            intv = null;
            fn(new Error("Timeout!"))
        }, delay)
        return function () {
            if (intv) {
                clearTimeout(intv);
                fn.apply(this, arguments);
            }
        }
    }

    function foo(err, data) {
        if (err) {
            console.error(err);

        } else {
            console.log(data);
        }
    }
    ajax("http://some.url.1", timeoutify(foo, 500));

    // 永远异步调用回调，即使就在事件循环的下一轮，这样，所有回调就都是可预测的异步调用了。



}

{
    function asyncify(fn){
        var orig_fn  = fn;
        intv = setTimeout(function(){
            intv = null;
            if(fn) fn();
        },0);

        return function(){
            if(intv){
                fn = orig_fn.bind.apply(
                    orig_fn,
                    [this].concat([].slice.call(arguments))
                );
            }
            else{
                orig_fn.apply(this,arguments)
            }
        }
    }
}