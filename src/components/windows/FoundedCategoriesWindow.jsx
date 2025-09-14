import styles from '../../styles/WindowsStyles/FoundedCategoriesWindow.module.css'
import loadCategories from '../../utils/categorysManagers/loadCategories'
import saveCategories from '../../utils/categorysManagers/saveCategories'
import loadMoneyOutputs from '../../utils/pricesManagers/loadMoneyOutputs'
import saveMoneyOutputs from '../../utils/pricesManagers/saveMoneyOutputs'
import loadActualUser from '../../utils/loadActualUser'
import { FaTrash, FaPen } from 'react-icons/fa'
import { useEffect, useState } from 'react'

import MessagePopup from '../windows/MessagePopup'
import EditCategoryWindow from '../windows/EditCategoryWindow'

export default function FoundedCategoriesWindow({ setShow, foundeds }) {
    const actualUser = loadActualUser()
    const [categories, setCategories] = useState([])
    const [moneyOutputs, setMoneyOutputs] = useState([])

    const [selectedCategory, setSelectedCategory] = useState('')
    const [showEditCategoryWin, setShowEditCategoryWin] = useState(false)

    const [showMessageEdited, setShowMessageEdited] = useState(false)
    const [showMessageRemoved, setShowMessageRemoved] = useState(false)

    const [localFoundeds, setLocalFoundeds] = useState(foundeds)

    useEffect(() => {
        setCategories(loadCategories(actualUser))
        setMoneyOutputs(loadMoneyOutputs(actualUser))
    }, [])

    const handleTdClick = (categoryName) => {
        setSelectedCategory(categoryName)
        setShowEditCategoryWin(true)
    }

    const editCategory = (newCategoryName, newCategoryGoal) => {
        const newCategoriesList = categories.map((c) => {
            if (c.name === selectedCategory) {
                return { goal: newCategoryGoal, name: newCategoryName }
            }
            return c
        })

        const newMoneyOutputsList = moneyOutputs.map((mo) => {
            if (mo.category === selectedCategory) {
                return { ...mo, category: newCategoryName }
            }
            return mo
        })

        saveCategories(actualUser, newCategoriesList)
        setCategories(newCategoriesList)

        saveMoneyOutputs(actualUser, newMoneyOutputsList)
        setMoneyOutputs(newMoneyOutputsList)

        const updatedFoundeds = localFoundeds.map(f => 
            f.name === selectedCategory ? { ...f, name: newCategoryName } : f
        )
        setLocalFoundeds(updatedFoundeds)

        setShowMessageEdited(true)
    }

    const removeCategory = (event, name) => {
        event.stopPropagation()
        const response = confirm(`Deseja remover a categoria "${name}" ?`)
        if (response) {
            const newCategoriesList = categories.filter(c => c.name !== name)
            const newMoneyOutputsList = moneyOutputs.filter(mo => mo.category !== name)

            saveCategories(actualUser, newCategoriesList)
            setCategories(newCategoriesList)

            saveMoneyOutputs(actualUser, newMoneyOutputsList)
            setMoneyOutputs(newMoneyOutputsList)

            const newLocalFoundeds = localFoundeds.filter(f => f.name !== name)
            setLocalFoundeds(newLocalFoundeds)

            setShowMessageRemoved(true)
        }
    }

    return (
        <div className={styles.overlay} >
            <div className={styles.foundedsWindow} >
                <div className={styles.windowHeader} >
                    <h2>Categorias encontradas</h2>
                    <button onClick={() => setShow(false)}>X</button>
                </div>
                <div className={styles.windowBody} >
                    {localFoundeds.length === 0 ? (
                        <p>Nenhuma categoria encontrada.</p>
                    ) : (
                        localFoundeds.map((e, i) => (
                            <div className={styles.categoryItem} key={i}>
                                <p>{e.name}</p>
                                <div className={styles.controls}>
                                    <button
                                        className={styles.buttonRemove}
                                        onClick={(event) => removeCategory(event, e.name)}
                                    >
                                        <FaTrash />
                                    </button>
                                    <button
                                        className={styles.buttonEdit}
                                        onClick={() => handleTdClick(e.name)}
                                    >
                                        <FaPen />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {showEditCategoryWin && (
                <EditCategoryWindow
                    setShow={setShowEditCategoryWin}
                    categoryName={selectedCategory}
                    handleEdit={editCategory}
                />
            )}
            {showMessageEdited && (
                <MessagePopup
                    setShowMessage={setShowMessageEdited}
                    message="Categoria editada!"
                />
            )}
            {showMessageRemoved && (
                <MessagePopup
                    setShowMessage={setShowMessageRemoved}
                    message="Categoria removida!"
                />
            )}
        </div>
    )
}
