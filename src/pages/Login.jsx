import styles from '../styles/PagesStyles/Login.module.css'

import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import defineActualUser from '../utils/defineActualUser'
import loadActualUser from '../utils/loadActualUser'
import loadUsers from '../utils/loadUsers'
import saveUsers from '../utils/saveUsers'

import PasswordAuthWindow from '../components/windows/PasswordAuthWindow'
import MessagePopup from '../components/windows/MessagePopup'
import Header from '../components/layout/HeaderAuth'
import UserItem from '../components/UserItem'


export default function Login({ setAuthenticated }) {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [showPasswordWindow, setShowPasswordWindow] = useState(false)

    const [showMessageDeleteUser, setShowMessageDeleteUser] = useState(false)
    const [showMessage, setShowMessage] = useState(false)

    const navigate = useNavigate()

    if (users.length == 0) {
        navigate('/registro')
    }

    useEffect(() => {
        setUsers(loadUsers())
    }, [])

    const openPasswordWindow = (username) => {
        setSelectedUser(username)
        setShowPasswordWindow(true)
    }

    const handleLogin = (password) => {
        const correctUserPassword = users.filter(
            u => u.username == selectedUser
        )[0].password
        if (password == correctUserPassword) {
            defineActualUser(selectedUser)
            setAuthenticated(true)
            navigate('/home')
        } else {
            setShowMessage(true)
        }
    }

    const deleteUser = (userName) => {
        const newUsersList = users.filter(u => u.username != userName)

        localStorage.removeItem(`${loadActualUser()}:moneyOutputs`)
        localStorage.removeItem(`${loadActualUser()}:moneyInputs`)
        localStorage.removeItem(`${loadActualUser()}:categories`)
        sessionStorage.removeItem('actualUser')

        saveUsers(newUsersList)
        setUsers(newUsersList)
        setShowMessageDeleteUser(true)
    }

    return (
        <>
            <Header title='Login' />
            <main className={styles.main}>
                <section className={styles.accounts}>
                    {users.map((u, i) => (
                        <UserItem
                            handleDeleteUser={() => deleteUser(u.username)}
                            onClick={() => openPasswordWindow(u.username)}
                            username={u.username}
                            key={i}
                        />
                    ))}
                </section>

                {showPasswordWindow && (
                    <PasswordAuthWindow
                        onConcludeLogin={handleLogin}
                        onClose={() => setShowPasswordWindow(false)}
                    />
                )}
                {showMessage && (
                    <MessagePopup
                        setShowMessage={setShowMessage}
                        message='Senha incorreta!'
                    />
                )}
                {showMessageDeleteUser && (
                    <MessagePopup
                        setShowMessage={setShowMessageDeleteUser}
                        message='Usuário deletado!'
                    />
                )}
            </main>
        </>
    )
}
