function getItems(fruitList, ...args, favoriteFruit) {
    return [...fruitList, ...args, favoriteFruit]
}

getItems(["banana", "apple"], "pear", "orange")//rest参数之后不能再有其它参数（即，只能是最后一个参数），否则会报错。