var status = "😎"

setTimeout(() => {
  const status = "😍"

  const data = {
    status: "🥑",
    getStatus() {
      return this.status
    }
  }
  console.log(this)
  console.log(data.getStatus())
  console.log(data.getStatus.call(this))
}, 0)