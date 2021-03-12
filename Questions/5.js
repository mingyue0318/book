const bird = {
    size: 'small'
}

const mouse = {
    name: 'Mickey',
    small: true
}

// A: mouse.bird.size是无效的
// B: mouse[bird.size]是无效的
// C: mouse[bird["size"]]是无效的
// D: 以上三个选项都是有效的