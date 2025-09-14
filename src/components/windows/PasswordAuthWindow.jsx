import styles from '../../styles/WindowsStyles/PasswordAuthWindow.module.css'
import { useState } from 'react'


export default function PasswordAuthWindow({ onConcludeLogin, onClose }) {
    const [password, setPassword] = useState('')

    const login = () => {
        onConcludeLogin(password)
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.window}>
                <div className={styles.windowHeader}>
                    <h1>Insira sua senha</h1>
                </div>
                <div className={styles.windowBody}>
                    <label htmlFor="inputPassword">Senha: </label>
                    <input
                        type="password"
                        value={password}
                        id="inputPassword"
                        placeholder='Insira sua senha de acesso'
                        minLength={1}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className={styles.windowFooter}>
                    <button
                        className={styles.cancelButton}
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className={styles.loginButton}
                        onClick={login}
                    >
                        Entrar
                    </button>
                </div>
            </div>
        </div>
    )
}
