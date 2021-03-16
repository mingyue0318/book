arr.reduce(callback, [initialValue]);

// reduce 为数组中的每一个元素依次执行回调函数，不包括数组中被删除或从未被赋值的元素，
// 接受四个参数：初始值（或者上一次回调函数的返回值），当前元素值，当前索引，调用 reduce 的数组。

Array.prototype.myForEach((fn) => {
    return this.reduce((pre, cur) => {
        fn(index, value)
    })
})

arr.myForEach((index, value) => {
    console.log(index, value)
})


const arr = [1, 2, 3]
const arr1 = [4, 5]
Array.prototype.myMap = function (fn, thisArg) {
    const result = [];
    this.reduce((prev, curr, index, array) => {
        result[index] = fn.call(thisArg, array[index], index, array);
    }, 0)
    return result;
}
arr.myMap(function (c, i) {
    return c + i + this.length
}, arr1)
// [3,5,7]



// p 为成员1,2,3，ps为成员的成绩，其中p和ps一一对应
// 求 每个成员的分数列表 {1: [1,2,2],2: [2,2,2], 3: [3,3,3]}
const p = [3, 3, 1, 2, 2, 1, 3, 2]
const ps = [69, 71, 93, 79, 81, 93, 77, 99]
const res = (p, ps) => {
    return p.reduce((cur, pre, index) => {
        if (!cur[pre]) {
            cur[pre] = [];
        }
        for (let i = 0; i < ps.length; i++) {
            if (index === i) {
                cur[pre].push(ps[i]);
            }
        }
        return cur
    }, {})
};
console.log(res(p, ps));

// 按照年龄进行分组 {18: [],19: [], 20: []}
const arr = [{
        name: '小孙',
        age: 18,
        score: 60,
        weight: 60
    },
    {
        name: '小王',
        age: 19,
        score: 70,
        weight: 55
    },
    {
        name: '小李',
        age: 18,
        score: 60,
        weight: 70
    },
    {
        name: '小刘',
        age: 20,
        score: 70,
        weight: 65
    },
    {
        name: '小赵',
        age: 18,
        score: 60,
        weight: 60
    },
    {
        name: '小钱',
        age: 19,
        score: 70,
        weight: 55
    },
    {
        name: '小周',
        age: 20,
        score: 60,
        weight: 50
    },
]
const groupBy = (arr, key) => {
    return arr.reduce((pre, cur) => {
        pre[cur[key]] = pre[cur[key]] || []
        pre[cur[key]].push(cur)
        return pre
    }, {})
}
console.log(groupBy(arr, 'age'))

// 扁平化数组
const c = [
    [1, 2, 3],
    [4, 5, [6, 7]]
]
const flatMap = (arr) => {
    return arr.reduce((pre, item) => {
        return pre.concat(Array.isArray(item) ? flatMap(item) : item)
    }, [])
}
console.log(flatMap(c))

// 字符串大小写区别    
const str = 'abCD'
const change = (str) => {
    let arr = str.split('')
    return arr.reduce((pre, cur) => {
        if (cur === cur.toLowerCase()) {
            pre.push(cur.toUpperCase())
        } else {
            pre.push(cur.toLowerCase())
        }
        return pre
    }, [])
}
console.log(change(str).join())


// 找数组中的公共元素
const arr10 = [1, 2, 3, 4]
const arr2 = [6, 4, 7, 8, 3]
const arr3 = [0, 9, 4, 3]
const getOnly = (...arr) => {
    return arr.reduce((pre, next) => {
        return pre.filter(c => next.includes(c))
    }, arr[0])
}
console.log(getOnly(arr10, arr2, arr3))

// 查找字符串中每个字符出现的次数    
const str1 = 'jgdsgdlkgj'
const op = str1.split('').reduce((pre, next) => {
    pre[next] ? pre[next]++ : pre[next] = 1
    return pre
}, {})
console.log(op)

// 查找公共前缀
const strArr = ["flower", "flow", "flight"]
const getStr = (strs) => {
    return strs.reduce((pre, next) => {
        while (!next.startsWith(pre)) {
            pre = pre.substring(0, pre.length - 1)
        }
        return pre
    }, strs[0])
}
console.log(getStr(strArr))

// 数组对象去重
const onlyList = (arr) => {
    return arr.reduce((pre, cur, index) => {
        if (pre.find(c => c.from === cur.from && c.to === cur.to)) {    
            return pre
        } else {
            return [...pre, cur]
        }
    }, [])
}
console.log(onlyList(quieArr))