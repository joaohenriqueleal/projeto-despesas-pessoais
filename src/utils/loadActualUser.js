"use strict"


export default function LoadActualUser() {
    return sessionStorage.getItem('actualUser') || null
}
