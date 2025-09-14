import styles from '../styles/PagesStyles/Register.module.css'
import savingsImg from '../assets/images/savings.svg'

import defineActualUser from "../utils/defineActualUser"
import loadUsers from '../utils/loadUsers.js'
import saveUsers from '../utils/saveUsers.js'

import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Header from '../components/layout/HeaderAuth.jsx'
import Input from '../components/form/Input.jsx'


export default function Register({ setAuthenticated, autoRedirect }) {
    const navigate = useNavigate()

    const [userValue, setUserValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    const registerNewUser = () => {
        saveUsers([
            ...loadUsers(),
            { username: userValue, password: passwordValue }
        ])
        defineActualUser(userValue)
        setAuthenticated(true)
        navigate('/home')
    }

    useEffect(() => {
        if (autoRedirect) {
            if (loadUsers().length > 0) {
                navigate('/login')
            }
        }
    }, [])

    return (
        <div className={styles.container} >
            <Header title='Registro' />
            <main>
                <div className={styles.form} >
                    <h2>Crie uma nova conta na costs!</h2>
                    
                    <Input 
                        id='user'
                        type='text'
                        label='Nome de usuário'
                        onChange={setUserValue}
                        placeholder='Insira seu nome de usuário'
                    />

                    <Input 
                        id='password'
                        type='password'
                        label='Sua senha'
                        onChange={setPasswordValue}
                        placeholder='Insira sua senha'
                    />

                    <button
                        className={styles.buttonRegister}
                        onClick={registerNewUser}
                    >
                        Registrar
                    </button>
                </div>
            </main>
            <div className={styles.containerSavingsImg} >
                <img
                    className={styles.savingsImg}
                    alt='Savings costs'
                    src={savingsImg}
                />
            </div>
        </div>
    )
}
