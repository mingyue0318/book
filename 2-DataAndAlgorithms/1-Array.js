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

{
    // die'tai'qi
}