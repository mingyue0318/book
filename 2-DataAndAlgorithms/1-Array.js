// 数组头部添加元素
{
    // 元素越多 效率越高
    let nums = [2, 3, 4, 5];
    let numsNew = 1;
    for (let i = nums.length; i > 0; i--) {
        nums[i] = nums[i - 1];
    }
    nums[0] = numsNew
    console.log(nums)
}

{
    let nums = [9, 1, 2, 3, 4, 5, 6];
    for (let i = 0; i < nums.length; ++i) {
        nums[i] = nums[i + 1]
    }
    console.log(nums)
}

{
    var nums = [6, 1, 2, 3, 4, 5];
    var first = nums.shift(); // first gets the value 9 
    nums.push(first);
}

{
    var nums = [3,1,2,100,4,200]; 
    nums.sort();
    console.log(nums)
}
// 迭代器
// 不生成新数组的迭代器
{// forEach 对数组中的每个元素 使用该函数
    function square(num){
        console.log(num,num*num)
    }
    let nums = [1,2,3,4,5,6,7,8,9,10]
    nums.forEach(square)
}
{// every 对数组中的每个元素 使用该函数
    //接受一个返回值为布尔类型的函数
    // 该函数均返回 true，则该方法返回 true
    function isEven(num){
        return num%2 === 0
    }
    let nums = [2,4,6,8,9];
    let even = nums.every(isEven)
    if(even) console.log('all numbers are even')
    else console.log('not all numbers are even')
}
{// some 对数组中的每个元素 使用该函数
    // 接受一个返回值为布尔类型的函数
    // 该函数均返回 true，则该方法返回 true
    function isEven(num){
        return num%2 === 0
    }
    let nums = [2,4,6,8,9];
    let someEven = nums.some(isEven)
    if(someEven) console.log('some numbers are even')
    else console.log('no numbers are even')
    let numss = [1,3,5,7];
    let someEvens = numss.some(isEven)
    if(someEvens) console.log('some numbers are even')
    else console.log('no numbers are even')
}
{//reduce 接受一个函数，返回一个值
 // 该方法会从一个累加值开始，不断对累加值和 数组中的后续元素调用该函数，直到数组中的最后一个元素，最后返回得到的累加值
    function add(total, currentValue) {
        return total + currentValue
    }
    let nums = [1,2,3,4,5,6,7,8,9,10];
    let sum = nums.reduce(add,20)
    console.log(sum)
}

{ // 生成新数组的迭代器方法

    // map
    {
       function curve( grade){
           return grade + 5
       } 
       let grades = [77,65,81,92,83];
       let newGrades = grades.map(curve);
       console.log(newGrades)

    }
    // filter
    {
        function isEven(num){
            return num%2 === 0
        }
        function isOdd(num){
            return num%2 !== 0
        }
        let nums = [];
        for(let i=0;i<20;i++){
            nums[i] = i+1
        }
        let evens = nums.filter(isEven);
        console.log(evens);
        let odds = nums.filter(isOdd);
        console.log(odds)
    }
    {
        function passing(num){
            return num>=60
        }

        var grades = [];
        for(let i=0;i<20;i++){
            grades[i] = Math.floor(Math.random()*101)
        }

        let passGrades = grades.filter(passing)

        console.log(passGrades)
    }
}

{//处理二维数组
    function Student(){
        this.achievement = []
        this.add = add;
        this.average = average
    }
    function add(num){
        this.achievement.push(nums);
    }
    function average(){
        let total = 0
        for(let i=0;i<this.achievement.length;i++){
            total += this.achievement[i]
        }
        return total/this.achievement.length
    }
}
{
    let words = ['Kobe Bean Bryant','LeBron James','Cristiano Ronaldo dos Santos Aveiro','Lionel Messi','Ronaldinho']
    words.sort()
    console.log(words);
    words.reverse()
    console.log(words);
}
{
    function Word(params) {
        this.words = []
        this.concat = concat
    }
    function concat(){
        return this.words.join()
    }

}
