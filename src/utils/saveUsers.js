"use strict"


export default function saveUsers(usersList) {
    localStorage.setItem('users', JSON.stringify(usersList))
}
