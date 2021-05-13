const myLifeSummedUp = ["☕", "💻", "🍷", "🍫"]

for (let item in myLifeSummedUp) {  // in index  in i开头所以是 index
  console.log(item)
}

for (let item of myLifeSummedUp) {  // of object  of o开头所以是 object 
  console.log(item)
}