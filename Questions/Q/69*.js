const _name = "Lydia Hallie"
console.log(_name.padStart(13))
console.log(_name.padStart(2))

// str.padStart(targetLength [, padString])

// targetLength
// 当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。

// padString 可选
// 填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的默认值为 " "（U+0020）