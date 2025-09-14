import styles from '../styles/MovimentationItem.module.css'

import { FaPen, FaTrash } from 'react-icons/fa'

import formatTimestamp from '../utils/timeUtils/formatTimestamp'
import formatPrice from '../utils/pricesManagers/formatPrice'


export default function MovimentationItem({ value, time, description, category,
                                            handleRemove, handleEdit }) {
    return (
        <div className={styles.content}>
            <div className={styles.movimentationInfos} >
                {category ? (
                <h3>Despesa</h3>
            ) : (
                <h3>Entrada</h3>
            )}
                <p className={styles.pDescription} >{description}</p>
                <p>{formatTimestamp(time)}</p>
                {category && (
                    <p>{category}</p>
                )}
                <p>{formatPrice(value)}</p>
            </div>
            <div className={styles.controls} >
                <button
                    className={styles.buttonRemove}
                    onClick={() => handleRemove(time)}
                >
                    <FaTrash />
                </button>
                <button
                    className={styles.buttonEdit}
                    onClick={() => handleEdit(time)}
                >
                    <FaPen />
                </button>
            </div>
        </div>
    )
}
