"use strict"


export default function saveMoneyOutputs(username, moneyOutputsList) {
    localStorage.setItem(
        `${username}:moneyOutputs`, JSON.stringify(moneyOutputsList)
    )
}
