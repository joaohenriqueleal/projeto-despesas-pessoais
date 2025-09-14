import styles from '../../styles/WindowsStyles/AddExpenseWindow.module.css'
import loadCategories from '../../utils/categorysManagers/loadCategories'
import LoadActualUser from '../../utils/loadActualUser'
import { useEffect, useState } from 'react'

import Input from '../../components/form/Input'


export default function AddExpenseWindow({ handleCancel, handleAddExpense, setShowMessage }) {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const cats = loadCategories(LoadActualUser())
        setCategories(cats)
        if (cats.length > 0) setSelectedCategory(cats[0].name)
    }, [])

    
    const [selectedCategory, setSelectedCategory] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState(0)

    const addExpense = () => {
        handleAddExpense(
            value,
            description,
            selectedCategory
        )
        handleCancel()
        setShowMessage(true)
    }
    
    return (
        <div className={styles.overlay} >
            <div className={styles.window} >
                <div className={styles.windowHeader} >
                    <h1>Adicionar despesa</h1>
                </div>
                <div className={styles.windowBody} >
                    <Input
                        type='number'
                        id='inputValue'
                        label='Valor da despesa R$: '
                        placeholder='Insira o valor da despesa R$'
                        onChange={setValue}
                    />
                    <Input
                        type='text'
                        id='inputDesc'
                        label='Descrição da despesa: '
                        placeholder='Insira a descrição da despesa'
                        onChange={setDescription}
                    />
                    <label htmlFor="selectCategory">Selecione a categoria: </label>
                    <select 
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        value={selectedCategory}
                        id='selectCategory'
                    >
                        {categories.map((e, i) => (
                            <option
                                value={e.name}
                                key={i}
                            >
                                {e.name}
                            </option>
                        ))}
                    </select>
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
                        onClick={addExpense}
                    >
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    )
}
