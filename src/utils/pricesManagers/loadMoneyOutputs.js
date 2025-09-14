"use strict"


export default function loadMoneyOutputs(username) {
    return JSON.parse(localStorage.getItem(
        `${username}:moneyOutputs`)
    ) || []
}
