import styles from '../../styles/WindowsStyles/AddMoneyInputWindow.module.css'
import Input from '../../components/form/Input'
import { useState } from 'react'


export default function AddMoneyInputWindow({ handleAddMoney, handleCancel, setShowMessage }) {
    const [valueToAdd, setValueToAdd] = useState('')
    const [description, setDescription] = useState('')

    const add = () => {
        if (!valueToAdd || isNaN(valueToAdd)) return
        handleAddMoney(Number(valueToAdd), description)
        handleCancel()
        setShowMessage(true)
    }

    return (
        <div className={styles.overlay} >
            <div className={styles.window} >
                <div className={styles.windowHeader} >
                    <h1>Adicionar entrada de dinheiro</h1>
                </div>
                <div className={styles.windowBody} >
                    <Input
                        type='number'
                        id='valueToAdd'
                        label='Valor R$: '
                        onChange={setValueToAdd}
                        placeholder='Insira o valor'
                    />
                    <Input
                        type='text'
                        id='description'
                        label='Descrição: '
                        onChange={setDescription}
                        placeholder='Insira a descrição da entrada'
                    />
                </div>
                <div className={styles.windowFooter} >
                    <button
                        className={styles.buttonCancel}
                        onClick={handleCancel}
                    >
                        Cancelar
                    </button>
                    <button
                        className={styles.buttonAdd}
                        onClick={add}
                    >
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    )
}
