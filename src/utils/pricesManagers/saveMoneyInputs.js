"use strict"


export default function saveMoneyInputs(username, moneyInputsList) {
    localStorage.setItem(`${username}:moneyInputs`, JSON.stringify(
        moneyInputsList
    ))
}
