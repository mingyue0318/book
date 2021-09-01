const _ = require("underscore");
const tool = require('./tools')

{
    // console.log(_.range(9,10))

    // console.log(_.map(_.range(4),function(v){return v*2}))

    function repeat(times, VALUE) {
        return _.map(_.range(times), function () {
            return VALUE
        })
    }

    console.info(repeat(10, "Major"))

    function repeatedly(times, fun) {
        return _.map(_.range(times), fun);
    }

    repeatedly(3, function () {
        return Math.floor(Math.random() * 10 + 1);
    })

    function iterateUntil(fun, check, init) {
        var ret = [];
        var result = fun(init);

        while (check(result)) {
            ret.push(result);
            result = fun(init);
        }
    }

    iterateUntil(function (n) {
        return n + n
    }, function (n) {
        return n <= 2048
    });


} {
    function repeatedly(times, fun) {
        return _.map(_.range(times), fun);
    }

    function always(VALUE) {
        return function () {
            return VALUE
        }
    }

    var f = always(function () {});

    console.log(f() === f()); // true

    var g = always(function () {});

    console.log(f() === g()); // false


    repeatedly(3, always("Odelay!"))

    // 
}

{
    function invoker(NAME, METHOD) {
        return function (target /* args.. */ ) {
            if (!tool.existy(target)) {
                fail("Must provide");
            }

            var targetMethod = target[NAME];
            var args = _.rest(arguments);

            return doWhen((tool.existy(targetMethod) && METHOD === targetMethod), function () {
                return targetMethod.apply(target, args);
            })
        }
    }

    var rev = invoker("reverse", Array.prototype.reverse);

    console.log(_.map([1, 2, 3], rev));

} {
    // 生成唯一字符串
    function uniqueString(len) {
        return Math.random().toString(36).substr(2, len);
    }

    uniqueString(10);

    // 生成前缀 固定的唯一字符串
    function makeUniqueStringFun(start) {
        var COUNTER = start;
        return function (prefix) {
            return [prefix, COUNTER++].join('');
        }
    }

    var uniqueString1 = makeUniqueStringFun(0);

    console.log(uniqueString1("yoyo"))

    var generator = {
        // 并不安全 count 可以随时修改
        count: 0,
        uniqueString: function (prefix) {
            return [prefix, this.count++].join("");
        }
    }

    generator.uniqueString("yoyo");

    var omgenerator = (function (init) {
        var COUNTER = init;
        return {
            uniqueString: function (prefix) {
                return [prefix, COUNTER++].join("");
            }
        }
    })(0)


    omgenerator.uniqueString("yoyo-")
    console.log(omgenerator.uniqueString("yoyo-"))
    // 也有缺点

    // 具有引用透明

} {
    const _ = require("underscore");
    const tool = require('./tools')
    var nums = [1, 2, 3, null, 5];

    _.reduce(nums, function (total, n) {
        return total * n
    })
    //=>0

    function fnull(fun){
        var defaults = _.rest(arguments);
        console.log("defaults",defaults)
        return function () {
            var args = _.map(arguments,function (e,i) {
                console.log(i,tool.existy(e) ? e: defaults[i])
                return tool.existy(e) ? e: defaults[i];
            })
            console.log("args",args)
            return fun.apply(null,args);
        }
    }

    var safeMult = fnull(function (total,n) {
        return total * n;
    },1,1);

    console.log(_.reduce(nums,safeMult));

    function defaults(d) {
        return function (o,k) {
            var val = fnull(_.identity,d[k]);
            return o && val(o[k]);
        }
    }

    function doSomething(config) {
        var lookup = defaults({critical:108});
        return lookup(config,"critical");
    }


    doSomething({critical:9});// 9

    doSomething({})//108
}
{
    // 判断对象是否有效  
    const _ = require("underscore");
    const tool = require('./tools');

    function checker(/* validators */) {
        var validators = _.toArray(arguments);
        return function (obj) {
            return _.reduce(validators,function (errs,check) {
                if(check(obj)){
                    return errs;
                }
                else
                    return _.chain(errs).push(check.message).value();
            },[]);
        }
    }

    function always(VALUE) {
        return function () {
            return VALUE
        }
    }

    var alwaysPasses = checker(always(true),always(true));
    console.log("alwaysPasses:",alwaysPasses({}))

    var fails = always(false);

    fails.message = "a failure in life";
    var alwaysFail = checker(fails);

    console.log("alwaysPasses:",alwaysFail({}))



    function validator(message,fun){
        var f = function(){
            return fun.apply(fun,arguments);
        }

        f['message'] = message;
        return f;
    }

    var gonnaFail = checker(validator("ZOMG!",always(false)));

    gonnaFail(100) // ["ZOMG!"]

    function aMap(obj) {
        return _.isObject(obj);
    }
    var checkCommand = checker(validator("must be a map",aMap));

    checkCommand({})
    checkCommand(90); // => ["must be a map"];

    function hasKeys() {
        var KEYS = _.toArray(arguments);
        var fun = function (obj) {
            return _.every(KEYS,function (k) {
                return _.has(obj,k);
            })
        }

        fun.message = cat(["Must have values for keys:"],KEYS).join();

        return fun;
    }

    var checkCommand = checker(validator("must be a map",aMap),hasKeys("msg","type"))
}