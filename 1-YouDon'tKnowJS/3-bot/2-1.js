// 字符串 数字  布尔 对象  null和undefined  符号（symbol）
所有的假值

// ''
// undefined 
// null
// 0 -0 NaN
// false


闭包

// 函数运行完成后，仍然可以继续访问函数的作用域

// 最常见 模块模式

function user(){
    var username,password;
    function doLogin(user,pwd){
        username = user;
        password = pwd;
    }
    var publicApi = {
        login:doLogin
    }
    return publicApi
}

var fred = user();

fred.login('wuxiaoyu','Aa@12345')