const existy = function (x){
    return x != null;
}
// false 和 undefined 返回false
const thuthy = function(x){
    return (x!==false)&& existy(x);
}

module.exports=   {
    existy,
    thuthy
}
