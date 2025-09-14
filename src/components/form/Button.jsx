import styles from '../../styles/FormStyles/Button.module.css'


export default function Button({ text, handleClick }) {
    return (
        <button onClick={() => handleClick(true)} className={styles.button} >
            {text}
        </button>
    )
}
