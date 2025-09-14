import styles from '../../styles/FormStyles/Input.module.css'


export default function Input({ type, placeholder, id, onChange, label }) {
    return (
        <div className={styles.inputsContainer} >
            {label && 
                (
                    <label
                        className={styles.label}
                        htmlFor={id}
                    >
                        {label}
                    </label>
                )
            }
            <input 
                type={type}
                name={id}
                id={id} 
                onChange={e => onChange(e.target.value)}
                className={styles.input}
                placeholder={placeholder}
            />
        </div>
    )
}
