"use strict"


export default function saveCategories(username, categoriesList) {
    localStorage.setItem(
        `${username}:categories`, JSON.stringify(categoriesList)
    )
}
