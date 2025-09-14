import styles from '../../styles/WindowsStyles/EditMovimentationWindow.module.css'
import { useState, useEffect } from 'react'

import loadMoneyInputs from '../../utils/pricesManagers/loadMoneyInputs'
import saveMoneyInputs from '../../utils/pricesManagers/saveMoneyInputs'
import loadMoneyOutputs from '../../utils/pricesManagers/loadMoneyOutputs'
import saveMoneyOutputs from '../../utils/pricesManagers/saveMoneyOutputs'
import loadCategories from '../../utils/categorysManagers/loadCategories'
import LoadActualUser from '../../utils/loadActualUser'

import MessagePopup from './MessagePopup'
import Input from '../form/Input'


export default function EditMovimentationWindow({ setShow, movementationToEdit,
    setMoneyInputs, setMoneyOutputs }) {

    const actualUser = LoadActualUser()

    const [showMessageEdited, setShowMessageEdited] = useState(false)
    const [categories, setCategories] = useState([])
    const [inputValue, setInputValue] = useState(0)
    const [inputCategory, setInputCategory] = useState('')
    const [inputDescription, setInputDescription] = useState('')

    useEffect(() => {
        const loadedCategories = loadCategories(actualUser)
        setCategories(loadedCategories)

        setInputValue(movementationToEdit.value || 0)
        setInputDescription(movementationToEdit.description || '')
        if (movementationToEdit.category) {
            setInputCategory(movementationToEdit.category || (loadedCategories[0]?.name || ''))
        }
    }, [movementationToEdit])

    const edit = () => {
        if (!movementationToEdit.category) {
            const updatedList = loadMoneyInputs(actualUser).map(m =>
                m.time == movementationToEdit.time
                    ? { ...m, description: inputDescription, value: inputValue }
                    : m
            )

            setMoneyInputs(updatedList)
            saveMoneyInputs(actualUser, updatedList)
        } else {
            const updatedList = loadMoneyOutputs(actualUser).map(m =>
                m.time == movementationToEdit.time
                    ? { ...m, description: inputDescription, category: inputCategory, value: inputValue }
                    : m
            )

            setMoneyOutputs(updatedList)
            saveMoneyOutputs(actualUser, updatedList)
        }

        setShowMessageEdited(true)

        setTimeout(() => {
            setShow(false)
        }, 3000)
    }

    return (
        <div className={styles.overlay} >
            <div className={styles.window} >
                <div className={styles.windowHeader} >
                    <h1>Editar movimentação</h1>
                </div>
                <div className={styles.windowBody} >
                    {movementationToEdit?.category && (
                        <div>
                            <label htmlFor="selectCategory">Selecione a nova categoria: </label>
                            <select
                                id="selectCategory"
                                value={inputCategory}
                                onChange={(e) => setInputCategory(e.target.value)}
                            >
                                {categories.map((e, i) => (
                                    <option key={i} value={e.name}>
                                        {e.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <Input
                        type='number'
                        id='InputValue'
                        value={inputValue}
                        onChange={(value) => setInputValue(Number(value))}
                        label='Valor da movimentação: '
                        placeholder='Insira o novo valor'
                    />
                    <Input
                        type='text'
                        id='InputDescription'
                        value={inputDescription}
                        onChange={setInputDescription}
                        label='Descrição da movimentação: '
                        placeholder='Insira a nova descrição'
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
                        onClick={edit}
                    >
                        Editar
                    </button>
                </div>
            </div>
            {showMessageEdited && (
                <MessagePopup
                    setShowMessage={setShowMessageEdited}
                    message='Movimentação editada!'
                />
            )}
        </div>
    )
}
