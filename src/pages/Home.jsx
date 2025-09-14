import styles from '../styles/PagesStyles/Home.module.css'
import stylesLaptop from '../styles/PagesStyles/HomeLaptop.module.css'

import loadMoneyOutputs from '../utils/pricesManagers/loadMoneyOutputs.js'
import saveMoneyOutputs from '../utils/pricesManagers/saveMoneyOutputs.js'
import loadMoneyInputs from '../utils/pricesManagers/loadMoneyInputs.js'
import saveMoneyInputs from '../utils/pricesManagers/saveMoneyInputs.js'
import loadCategories from '../utils/categorysManagers/loadCategories.js'
import saveCategories from '../utils/categorysManagers/saveCategories.js'
import loadActualUser from '../utils/loadActualUser.js'

import { useEffect, useState } from 'react'

import AddNewCategoryWindow from '../components/windows/AddNewCategoryWindow'
import AddMoneyInputWindow from '../components/windows/AddMoneyInputWindow'
import AddExpenseWindow from '../components/windows/AddExpenseWindow.jsx'

import MessagePopup from '../components/windows/MessagePopup'
import HeaderHome from '../components/layout/HeaderHome'
import Footer from '../components/layout/Footer'
import Button from '../components/form/Button'

import ResumeCategoriesChart from '../components/charts/ResumeCategoriesChart'
import MoneyInputResume from '../components/charts/MoneyInputResume'
import ResumeGoals from '../components/charts/ResumeGoals'


export default function Home() {
    const [showMessageAddExpense, setShowMessageAddExpense] = useState(false)
    const [showMessageAddedCategoryPopup, setShowMessageAddedCategoryPopup] = useState(false)
    const [showMessageAddMoneyInputs, setShowMessageAddMoneyInputs] = useState(false)
    const [showMessageDontExistsCategories, setShowMessageDontExistsCategories] = useState(false)
    const [showMessageDuplicateCategory, setShowMessageDuplicateCategory] = useState(false)

    const [showNewCategoryWin, setShowNewCategoryWin] = useState(false)
    const [showAddMoneyInputWin, setShowAddMoneyInputWin] = useState(false)
    const [showAddExpenseWin, setShowAddExpenseWin] = useState(false)

    const [categories, setCategories] = useState([])

    const [timeSelected, setTimeSelected] = useState('30d')
    const actualUser = loadActualUser()
    
    const [userMoneyInputs, setUserMoneyInputs] = useState([])
    const [userMoneyOutputs, setUserMoneyOutputs] = useState([])

    useEffect(() => {
        setUserMoneyInputs(loadMoneyInputs(actualUser))
        setUserMoneyOutputs(loadMoneyOutputs(actualUser))
        setCategories(loadCategories(actualUser))
    }, [])

    const addNewCategory = (newCategoryName, newCategoryGoal) => {
        let exists = false
        categories.map((c) => {
            if (c.name == newCategoryName) {
                setShowMessageDuplicateCategory(true)
                exists = true
            }
        })
        if (exists) return
        const newCategory = { name: newCategoryName, goal: newCategoryGoal }
        const newCategoriesList = [...categories, newCategory]
        setCategories(newCategoriesList)
        saveCategories(actualUser, newCategoriesList)
        setShowMessageAddedCategoryPopup(true)
    }

    const addMoneyInput = (value, description) => {
        if (!value || isNaN(value)) return
        const newMoneyInputsList = [
            ...userMoneyInputs, { value, description, time: Date.now() }
        ]
        saveMoneyInputs(actualUser, newMoneyInputsList)
        setUserMoneyInputs(newMoneyInputsList)
    }

    const addExpense = (value, description, selectedCategory) => {
        if (categories.length == 0) {
            setShowMessageDontExistsCategories(true)
            return
        }
        const newMoneyOutputsList = [
            ...userMoneyOutputs, {
                value: Number(value),
                description: description,
                category: selectedCategory,
                time: Date.now()
            }
        ]
        saveMoneyOutputs(actualUser, newMoneyOutputsList)
        setUserMoneyOutputs(newMoneyOutputsList)
    }

    return (
        <div className={styles.containerHome} >
            <HeaderHome
                moneyInputs={userMoneyInputs}
                moneyOutputs={userMoneyOutputs}
                setTime={setTimeSelected}
            />
            <main className={`${styles.main} ${stylesLaptop.main}`} >
                <section className={styles.sectionAddItems} >
                    <Button handleClick={setShowNewCategoryWin} text='Nova categoria' />
                    <Button handleClick={setShowAddMoneyInputWin} text='Adicionar entrada' />
                    <Button handleClick={setShowAddExpenseWin} text='Adicionar despesa' />
                </section>
                <section className={styles.chartResumeCategories} >
                    <h2>Participação das categorias nas despesas</h2>
                    <ResumeCategoriesChart selectedTime={timeSelected} />
                </section>
                <section className={styles.graphicGoals} >
                    <h2>Resumo das suas metas</h2>
                    <ResumeGoals selectedTime={timeSelected} />
                </section>
                <section className={styles.resumeMoneyInputs} >
                    <h2>Resumo das entradas</h2>
                    <MoneyInputResume selectedTime={timeSelected} />
                </section>

                {showNewCategoryWin && (
                    <AddNewCategoryWindow
                        handleAddCategory={addNewCategory}
                        handleCancel={() => setShowNewCategoryWin(false)}
                        setShowMessage={setShowMessageAddedCategoryPopup}
                    />
                )}
                {showMessageAddedCategoryPopup && (
                    <MessagePopup
                        setShowMessage={setShowMessageAddedCategoryPopup}
                        message='Categoria adicionada!'
                    />
                )}
                {showAddMoneyInputWin && (
                    <AddMoneyInputWindow
                        handleAddMoney={addMoneyInput}
                        handleCancel={() => setShowAddMoneyInputWin(false)}
                        setShowMessage={setShowMessageAddMoneyInputs}
                    />
                )}
                {showMessageAddMoneyInputs && (
                    <MessagePopup
                        setShowMessage={setShowMessageAddMoneyInputs}
                        message='Entrada adicionada!'
                    />
                )}
                {showAddExpenseWin && (
                    <AddExpenseWindow
                        handleAddExpense={addExpense}
                        handleCancel={() => setShowAddExpenseWin(false)}
                        setShowMessage={setShowMessageAddExpense}
                    />
                )}
                {showMessageAddExpense && (
                    <MessagePopup
                        setShowMessage={setShowMessageAddExpense}
                        message='Despesa adicionada!'
                    />
                )}
                {showMessageDontExistsCategories && (
                    <MessagePopup
                        setShowMessage={setShowMessageDontExistsCategories}
                        message='Adicione uma categoria antes!'
                    />
                )}
                {showMessageDuplicateCategory && (
                    <MessagePopup
                        setShowMessage={setShowMessageDuplicateCategory}
                        message='Categoria já existente!'
                    />
                )}
            </main>
            <Footer />
        </div>
    )
}
