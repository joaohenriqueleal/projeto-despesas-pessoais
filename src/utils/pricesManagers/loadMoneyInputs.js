"use strict"


export default function loadMoneyInputs(username) {
    return JSON.parse(localStorage.getItem(
        `${username}:moneyInputs`)
    ) || []
}
