// 条件判断时除了Falsy全部转换为真值。Falsy有 false, 0、-0, '', undefined, null, NaN, document.all

const one = (false || {} || null)
const two = (null || false || "")
const three = ([] || 0 || true)

console.log(one, two, three)