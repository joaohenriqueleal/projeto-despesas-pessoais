import styles from '../../styles/WindowsStyles/EditCategoryWindow.module.css'
import { useState, useEffect } from 'react'

import Input from '../form/Input'

export default function EditCategoryWindow({ setShow, categoryName, categoryGoal, handleEdit }) {
    const [newName, setNewName] = useState(categoryName)
    const [newGoal, setNewGoal] = useState(categoryGoal)

    useEffect(() => {
        setNewName(categoryName)
        setNewGoal(categoryGoal)
    }, [categoryName, categoryGoal])

    const onEdit = () => {
        handleEdit(newName, newGoal)
        setShow(false)
    }

    return (
        <div className={styles.overlay} >
            <div className={styles.window} >
                <div className={styles.windowHeader} >
                    <h1>Editar categoria</h1>
                    <p>Categoria atual: {categoryName}</p>
                </div>
                <div className={styles.windowBody} >
                    <Input
                        type='text'
                        id='categoryName'
                        label='Novo nome da categoria: '
                        placeholder='Insira o novo nome'
                        value={newName}
                        onChange={setNewName}
                    />
                    <Input
                        type='number'
                        id='categoryGoal'
                        label='Nova meta: '
                        placeholder='Insira a nova meta'
                        value={newGoal}
                        onChange={setNewGoal}
                    />
                </div>
                <div className={styles.windowFooter} >
                    <button
                        className={styles.buttonCancel}
                        onClick={() => setShow(false)}
                    >
                        Cancelar
                    </button>
                    <button
                        className={styles.buttonEdit}
                        onClick={onEdit}
                    >
                        Editar
                    </button>
                </div>
            </div>
        </div>
    )
}
