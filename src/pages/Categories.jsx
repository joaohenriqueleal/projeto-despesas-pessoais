import styles from '../styles/PagesStyles/Categories.module.css'
import { useEffect, useState } from 'react'

import Input from '../components/form/Input'
import Button from '../components/form/Button'
import Footer from '../components/layout/Footer'
import MessagePopup from '../components/windows/MessagePopup'
import HeaderWithMenu from '../components/layout/HeaderWithMenu'
import EditCategoryWindow from '../components/windows/EditCategoryWindow'
import FoundedCategoriesWindow from '../components/windows/FoundedCategoriesWindow'

import formatPrice from '../utils/pricesManagers/formatPrice'
import loadCategories from '../utils/categorysManagers/loadCategories'
import saveCategories from '../utils/categorysManagers/saveCategories'
import loadMoneyOutputs from '../utils/pricesManagers/loadMoneyOutputs'
import saveMoneyOutputs from '../utils/pricesManagers/saveMoneyOutputs'
import loadActualUser from '../utils/loadActualUser'

import { FaTrash, FaPen } from 'react-icons/fa'


export default function Categories() {
    const actualUser = loadActualUser()
    const [categories, setCategories] = useState([])

    const [showMessageEdited, setShowMessageEdited] = useState(false)
    const [showMessageRemoved, setShowMessageRemoved] = useState(false)

    const [showFoundedCategries, setShowFoundedCategries] = useState(false)

    const [moneyOutputs, setMoneyOutputs] = useState([])

    const [showEditCategoryWin, setShowEditCategoryWin] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedGoal, setSelectedGoal] = useState(0)

    useEffect(() => {
        setCategories(loadCategories(actualUser))
        setMoneyOutputs(loadMoneyOutputs(actualUser))
    }, [])

    const handleTdClick = (categoryName) => {
        const category = categories.find(c => c.name === categoryName)
        setSelectedCategory(categoryName)
        setSelectedGoal(category?.goal || 0)
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

            setShowMessageRemoved(true)
        }
    }

    const [searchValue, setSearchValue] = useState('')
    const [founded, setFounded] = useState([])

    const normalizeText = (text) => {
        return text.toLowerCase()
    }

    const search = () => {
        const query = normalizeText(searchValue)

        const foundedCategories = categories.filter((c) => {
            if (!c.name) return false
            return normalizeText(c.name).includes(query)
        })
        setShowFoundedCategries(true)
        setFounded(foundedCategories)
    }

    return (
        <>
            <HeaderWithMenu title='Categorias' />
            <main className={styles.main}>
                <section className={styles.search}>
                    <Input
                        type='text'
                        id='SearchValue'
                        onChange={setSearchValue}
                        label='Nome da categoria: '
                        placeholder='Insira o nome da categoria'
                    />
                    <Button
                        text='Pesquisar'
                        handleClick={search}
                    />
                </section>
                <section className={styles.dataGridView}>
                    <table>
                        <thead>
                            <tr>
                                <th>Categorias</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length === 0 ? (
                                <tr>
                                    <td colSpan="1">Nenhuma categoria encontrada</td>
                                </tr>
                            ) : (
                                categories.map((e, i) => (
                                    <tr key={i}>
                                        <td>
                                            <div className={styles.infos} >
                                                <p>{e.name}</p>
                                                <p>Meta: {formatPrice(Number(e.goal))}</p>
                                            </div>
                                            <div className={styles.controls} >
                                                <button
                                                    className={styles.buttonRemoveCategory}
                                                    onClick={(event) => removeCategory(event, e.name)}
                                                >
                                                    <FaTrash />
                                                </button>
                                                <button
                                                    onClick={() => handleTdClick(e.name)}
                                                    className={styles.buttonEditCategory}
                                                >
                                                    <FaPen />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </section>

                {showFoundedCategries && (
                    <FoundedCategoriesWindow
                        setShow={setShowFoundedCategries}
                        foundeds={founded}
                    />
                )}
                {showEditCategoryWin && (
                    <EditCategoryWindow
                        setShow={setShowEditCategoryWin}
                        categoryName={selectedCategory}
                        categoryGoal={selectedGoal}
                        handleEdit={editCategory}
                    />
                )}
                {showMessageEdited && (
                    <MessagePopup
                        setShowMessage={setShowMessageEdited}
                        message='Categoria editada!'
                    />
                )}
                {showMessageRemoved && (
                    <MessagePopup
                        setShowMessage={setShowMessageRemoved}
                        message='Categoria removida!'
                    />
                )}
                <Footer />
            </main>
        </>
    )
}
