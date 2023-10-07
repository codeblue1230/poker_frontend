const grabCard = (card) => {
    console.log(card)
}

const testApi = async () => {
    let response = await axios.get("https://poker1230.pythonanywhere.com/7h/8c&10s/Kd/2c/5s/9d")
    console.log(response)
    let key = Object.keys(response.data)
    let value = response.data[key]
    for (let item of value) {
        console.log(item)
    }
}

testApi()