"use strict"


export default function defineActualUser(name) {
    sessionStorage.setItem('actualUser', name)
}
