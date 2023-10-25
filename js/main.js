let cards = {
    "2s": ["\u{1F0A2}", "black"],
    "2c": ["\u{1F0D2}", "black"],
    "2h": ["\u{1F0B2}", "red"],
    "2d": ["\u{1F0C2}", "red"],
    "3s": ["\u{1F0A3}", "black"],
    "3c": ["\u{1F0D3}", "black"],
    "3h": ["\u{1F0B3}", "red"],
    "3d": ["\u{1F0C3}", "red"],
    "4s": ["\u{1F0A4}", "black"],
    "4c": ["\u{1F0D4}", "black"],
    "4h": ["\u{1F0B4}", "red"],
    "4d": ["\u{1F0C4}", "red"],
    "5s": ["\u{1F0A5}", "black"],
    "5c": ["\u{1F0D5}", "black"],
    "5h": ["\u{1F0B5}", "red"],
    "5d": ["\u{1F0C5}", "red"],
    "6s": ["\u{1F0A6}", "black"],
    "6c": ["\u{1F0D6}", "black"],
    "6h": ["\u{1F0B6}", "red"],
    "6d": ["\u{1F0C6}", "red"],
    "7s": ["\u{1F0A7}", "black"],
    "7c": ["\u{1F0D7}", "black"],
    "7h": ["\u{1F0B7}", "red"],
    "7d": ["\u{1F0C7}", "red"],
    "8s": ["\u{1F0A8}", "black"],
    "8c": ["\u{1F0D8}", "black"],
    "8h": ["\u{1F0B8}", "red"],
    "8d": ["\u{1F0C8}", "red"],
    "9s": ["\u{1F0A9}", "black"],
    "9c": ["\u{1F0D9}", "black"],
    "9h": ["\u{1F0B9}", "red"],
    "9d": ["\u{1F0C9}", "red"],
    "10s": ["\u{1F0AA}", "black"],
    "10c": ["\u{1F0DA}", "black"],
    "10h": ["\u{1F0BA}", "red"],
    "10d": ["\u{1F0CA}", "red"],
    "Js": ["\u{1F0AB}", "black"],
    "Jc": ["\u{1F0DB}", "black"],
    "Jh": ["\u{1F0BB}", "red"],
    "Jd": ["\u{1F0CB}", "red"],
    "Qs": ["\u{1F0AD}", "black"],
    "Qc": ["\u{1F0DD}", "black"],
    "Qh": ["\u{1F0BD}", "red"],
    "Qd": ["\u{1F0CD}", "red"],
    "Ks": ["\u{1F0AE}", "black"],
    "Kc": ["\u{1F0DE}", "black"],
    "Kh": ["\u{1F0BE}", "red"],
    "Kd": ["\u{1F0CE}", "red"],
    "As": ["\u{1F0A1}", "black"],
    "Ac": ["\u{1F0D1}", "black"],
    "Ah": ["\u{1F0B1}", "red"],
    "Ad": ["\u{1F0C1}", "red"]
}
let cardCount = 0
let cardObj = {}
let cardList = []
let holeCount = 0
let comCount = 0

const checkCSS = () => {
    let stylesheet = document.getElementById("stylesheet")
    const storedCSS = localStorage.getItem('CSS')
    if (storedCSS) {
        stylesheet.href = storedCSS
    }
}

const grabCard = (card) => {
    if (cardCount === 7) {return}
    let newHand = document.getElementById("new_hand")
    let playerCard = document.getElementById("hole_cards")
    let comCards = document.getElementById("com_cards")
    let pHead = document.getElementById("p_heading")
    let cHead = document.getElementById("c_heading")
    newHand.style.display = "block"
    pHead.style.display = "block"
    cardObj[card] = card
    if (comCount < 5 && holeCount == 2) {
        if (cards[card][1] === "red") {
            let cardElement = document.createElement("span")
            cardElement.innerHTML = cards[card][0]
            comCards.append(cardElement)
            cardElement.classList.add("red_cards")
        }
        else { comCards.append(cards[card][0]) }
        cHead.style.display = "block"
        comCount++
    }
    if (holeCount < 2) {
        if (cards[card][1] === "red") {
            let cardElement = document.createElement("span")
            cardElement.innerHTML = cards[card][0]
            playerCard.append(cardElement)
            cardElement.classList.add("red_cards")
        }
        else { playerCard.append(cards[card][0]) }
        holeCount++
    }
    if (holeCount === 2 && comCount === 5) {
        let sub = document.getElementById("sub")
        sub.style.display = "block"
        // const keys = Object.keys(cardObj)
        // for (let i = 0; i < keys.length; i++) {
        //     cardList.push(keys[i])
        // }
    }
    cardCount++
}

const testApi = async () => {
    const keys = Object.keys(cardObj)
    for (let i = 0; i < keys.length; i++) {
        cardList.push(keys[i])
    }
    let hand = document.getElementById("hand")
    let fiveBest = document.getElementById("best_cards")
    let response = await axios.get(`https://poker1230.pythonanywhere.com/${cardList[0]}/${cardList[1]}&${cardList[2]}/${cardList[3]}/${cardList[4]}/${cardList[5]}/${cardList[6]}`)
    let key = Object.keys(response.data)
    hand.innerHTML = key
    let value = response.data[key]
    for (let item of value) {
        if (cards[item][1] === "red") {
            let cardElement = document.createElement("span")
            cardElement.innerHTML = cards[item][0]
            fiveBest.append(cardElement)
            cardElement.classList.add("red_cards")
        }
        else {fiveBest.append(cards[item][0])}
    }
    let sub = document.getElementById("sub")
    let bestCards = document.getElementById("best_cards")
    sub.style.display = "none"
    fiveBest.style.paddingBottom = "25px"
    bestCards.classList.toggle("best_cards_border")
}

const clearHand = () => {
    location.reload()
}

const switchBright = (domButton) => {
    let button = document.getElementById(domButton)
    let stylesheet = document.getElementById("stylesheet")
    let baseURL = window.location.origin
    stylesheet.href = "./css/light.css"
    const storedCSS = localStorage.getItem('CSS')
    if (storedCSS === `${baseURL}/css/light.css`) {
        stylesheet.href = "./css/style.css"
        localStorage.setItem("CSS", stylesheet.href)
        button.innerHTML = "Light Mode"
    }
    else if (storedCSS === `${baseURL}/css/style.css`) {
        stylesheet.href = "./css/light.css"
        localStorage.setItem("CSS", stylesheet.href)
        button.innerHTML = "Dark Mode"
    }
    localStorage.setItem("CSS", stylesheet.href)
}

