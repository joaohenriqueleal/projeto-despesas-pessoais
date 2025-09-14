import { useEffect } from 'react'
import styles from '../../styles/WindowsStyles/MessagePopup.module.css'

export default function MessagePopup({ setShowMessage, message }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMessage(false)
        }, 3000)

        return () => clearTimeout(timer)
    }, [setShowMessage])

    return (
        <div className={styles.popup}>
            <p>{message}</p>
            <button
                className={styles.closePopup}
                onClick={() => setShowMessage(false)}
            >
                X
            </button>
            <div className={styles.progressBar}></div>
        </div>
    )
}
