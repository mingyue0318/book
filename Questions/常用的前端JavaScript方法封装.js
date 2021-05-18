// https://mp.weixin.qq.com/s/pp56PSMLmrAV2iqLnngHcQ 待续...

// 1、输入一个值，返回其数据类型**

function type(para) {
    return Object.prototype.toString.call(para);
}

// 2 去重
function unique1(arr) {
    return [...new Set(arr)];
}

function unique2(arr) {
    var obj = {}
    return arr.filter(ele => !obj[ele] && (obj[ele] = true && true))
    // return arr.filter(ele=>{
    //     if(!obj[ele]){
    //         obj[ele] = true;
    //         return true
    //     }
    // })
}


function unique3(arr) {
    var result = [];
    arr.forEach(ele => {
        if (!~result.indexOf(ele)) {
            result.push(ele)
        }
    })
    return result
}

// 3.字符串去重
String.prototype.unique = function () {
    var obj = {},
        str = '',
        len = this.length;
    for (var i = 0; i < len; i++) {
        if (!obj[this[i]]) {
            str += this[i];
            obj[this[i]] = true;
        }
    }
    return str;
}

// ###### //去除连续的字符串 
function uniq(str) {
    return str.replace(/(\w)\1+/g, '$1')
}


// 4、深拷贝 浅拷贝

//深克隆（深克隆不考虑函数）
function deepClone(obj, result) {
    var result = result || {};
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (typeof obj[prop] == 'object' && obj[prop] !== null) {
                // 引用值(obj/array)且不为null
                if (Object.prototype.toString.call(obj[prop]) == '[object Object]') {
                    // 对象
                    result[prop] = {};
                } else {
                    // 数组
                    result[prop] = [];
                }
                deepClone(obj[prop], result[prop])
            } else {
                // 原始值或func
                result[prop] = obj[prop]
            }
        }
    }
    return result;
}

// 深浅克隆是针对引用值
function deepClone(target) {
    if (typeof (target) !== 'object') {
        return target;
    }
    var result;
    if (Object.prototype.toString.call(target) == '[object Array]') {
        // 数组
        result = []
    } else {
        // 对象
        result = {};
    }
    for (var prop in target) {
        if (target.hasOwnProperty(prop)) {
            result[prop] = deepClone(target[prop])
        }
    }
    return result;
}
// 无法复制函数
var o1 = jsON.parse(jsON.stringify(obj1));

// 5、reverse底层原理和扩展

String.prototype.myReverse = function(){
    var len = this.length;
    for(var i=0;i<len;i++){
        var temp = this[i];
        this[i] = this[len-1-i];
        this[len-1-i] = temp;
    }
    return this
}

// 格式化时间
function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}