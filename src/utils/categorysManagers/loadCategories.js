"use strict"


export default function loadCategories(username) {
    return JSON.parse(
        localStorage.getItem(`${username}:categories`)
    ) || []
}
