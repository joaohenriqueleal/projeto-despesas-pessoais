import styles from '../../styles/WindowsStyles/AddNewCategoryWindow.module.css'
import Input from '../form/Input'
import { useState } from 'react'


export default function AddNewCategoryWindow({ handleAddCategory, handleCancel, setShowMessage }) {
    const [categoryName, setCategoryName] = useState('')
    const [categoryGoal, setCategoryGoal] = useState('')

    const addCategory = () => {
        handleAddCategory(categoryName, categoryGoal)
        handleCancel()
        setShowMessage(true)
    }
    
    return (
        <div className={styles.overlay}>
            <div className={styles.window} >
                <div className={styles.windowHeader} >
                    <h1>Nova categoria</h1>
                </div>
                <div className={styles.windowBody} >
                    <Input
                        type='text'
                        id='categoryName'
                        label='Nome da categoria:'
                        onChange={setCategoryName}
                        placeholder='Insira o nome da categoria'
                    />
                    <Input
                        type='number'
                        id='categoryGoal'
                        label='Meta da categoria:'
                        onChange={setCategoryGoal}
                        placeholder='Insira o valor da meta R$'
                    />
                </div>
                <div className={styles.windowFooter} >
                    <button
                        className={styles.buttonCloseWindow}
                        onClick={handleCancel}
                    >
                        Cancelar
                    </button>
                    <button 
                        className={styles.buttonAddCategory}
                        onClick={addCategory}
                    >
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    )
}
