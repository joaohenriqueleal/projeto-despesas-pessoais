import styles from '../styles/UserItem.module.css'

import { FaUser, FaTrash } from 'react-icons/fa'
import { useState } from 'react'

import MessagePopup from '../components/windows/MessagePopup'
import loadUsers from '../utils/loadUsers'


export default function UserItem({ username, onClick, handleDeleteUser }) {
    const [showIncorrectPasswordMessage, setShowIncorrectPasswordMessage] = useState(false)

    const deleteUser = (e) => {
        e.stopPropagation()

        const correctUserPassword = loadUsers().find(u => u.username === username).password
        const password = prompt(`Digite a senha do usuário ${username}:`)
        if (password == correctUserPassword) {
            handleDeleteUser()
        } else {
            setShowIncorrectPasswordMessage(true)
        }
    }

    return (
        <div
            className={styles.itemContainer}
            onClick={onClick}
        >
            <p>{username}</p>
            <div className={styles.controls} >
                <button
                    onClick={(e) => deleteUser(e)}
                >
                    <FaTrash />
                </button>
                <FaUser />
            </div>
            {showIncorrectPasswordMessage && (
                <MessagePopup
                    message='Senha incorreta!'
                />
            )}
        </div>
    )
}
