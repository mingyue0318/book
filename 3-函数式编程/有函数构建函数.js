const _ = require("underscore");
const tool = require('./tools');

function dispatch(){
    var funs = _.toArray(arguments);
    var size = funs.size;

    return function (target) {
        var ret = undefined;
        var args = _.rest(arguments);

        for (let funIndex = 0; funIndex < size; funIndex++) {
            var fun = funs[funIndex];
            ret = fun.apply(fun,construct(target,args));
            
            if(tool.existy(ret)) return ret;
        }
        return ret;
    }
}