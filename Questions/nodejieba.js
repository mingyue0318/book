// https://github.com/yanyiwu/nodejieba/blob/master/test/load_dict_demo.js






{
    const nodejieba = require('nodejieba');
    var result = nodejieba.cut('帝国主义要把我们的地瓜分掉');
    console.log(result);
}

{
    const nodejieba = require('nodejieba');
    nodejieba.load({
        userDict: __dirname + '/user.uft8'
    })
    var result = nodejieba.cut('帝国主义要把我们的地瓜分掉');
    console.log(result);

    result = nodejieba.cut('土地，俺老孙的金箍棒在哪里？');
    console.log(result);
    //[ '土地', '，', '俺', '老', '孙', '的', '金箍棒', '在', '哪里', '？' ]

    result = nodejieba.cut('大圣，您的金箍棒就棒在特别配您的头型！');
    console.log(result);
} 
{
    const nodejieba = require('nodejieba');
}