import styles from '../styles/PagesStyles/History.module.css'
import { useEffect, useState } from 'react'

import EditMovimentationWindow from '../components/windows/EditMovimentationWindow'
import HeaderWithMenu from '../components/layout/HeaderWithMenu'
import MovimentationItem from '../components/MovimentationItem'
import MessagePopup from '../components/windows/MessagePopup'
import Footer from '../components/layout/Footer'
import Input from '../components/form/Input'

import loadMoneyInputs from '../utils/pricesManagers/loadMoneyInputs'
import loadMoneyOutputs from '../utils/pricesManagers/loadMoneyOutputs'
import saveMoneyInputs from '../utils/pricesManagers/saveMoneyInputs'
import saveMoneyOutputs from '../utils/pricesManagers/saveMoneyOutputs'
import formatTimestamp from '../utils/timeUtils/formatTimestamp'
import loadActualUser from '../utils/loadActualUser'


export default function History() {
    const [showMessageRemovedHistory, setShowMessageRemovedHistory] = useState(false)

    const [showFoundedsWindow, setShowFoundedsWindow] = useState(false)
    const [showWindowEditMovementation, setShowWindowEditMovementation] = useState(false)

    const actualUser = loadActualUser()

    const [moneyInputs, setMoneyInputs] = useState([])
    const [moneyOutputs, setMoneyOutputs] = useState([])

    const [movementations, setMovementations] = useState([])

    const [inputSearch, setInputSearch] = useState('')

    useEffect(() => {
        setMoneyInputs(loadMoneyInputs(actualUser))
        setMoneyOutputs(loadMoneyOutputs(actualUser))
    }, [])

    useEffect(() => {
        const allMovements = [
            ...moneyInputs,
            ...moneyOutputs
        ]
        allMovements.sort((a, b) => b.time - a.time)
        setMovementations(allMovements)
    }, [moneyInputs, moneyOutputs])

    const [actualMovementationToEdit, setActualMovementationToEdit] = useState({})

    const deleteMovimentation = (time) => {
        const confirmation = confirm('Você deseja remover essa movimentação?')
        if (confirmation) {
            let isInput = false
            const newMovimentationsList = movementations.filter((m) => {
                if (m.time === time) {
                    if (!m.category) isInput = true
                    return false
                }
                return true
            })

            if (isInput) {
                const newMoneyInputsList = moneyInputs.filter(my => my.time !== time)
                setMovementations(newMovimentationsList)
                setMoneyInputs(newMoneyInputsList)
                saveMoneyInputs(actualUser, newMoneyInputsList)
            } else {
                const newMoneyOutputsList = moneyOutputs.filter(my => my.time !== time)
                setMovementations(newMovimentationsList)
                setMoneyOutputs(newMoneyOutputsList)
                saveMoneyOutputs(actualUser, newMoneyOutputsList)
            }
            setShowMessageRemovedHistory(true)
        }
    }

    const editMovimentation = (time) => {
        const movementationToEdit = movementations.find((m) => m.time == time)
        setActualMovementationToEdit(movementationToEdit)
        setShowWindowEditMovementation(true)
    }

    const [foundeds, setFoundeds] = useState([])

    const normalizeText = (text) => {
        return text.toLowerCase()
    }

    const searchMovementation = () => {
        const query = normalizeText(inputSearch)

        const foundedsMovimentations = movementations.filter(mo => {
            if (mo.category) {
                return normalizeText(
                    mo.category +
                    mo.description +
                    mo.time +
                    mo.value +
                    formatTimestamp(mo.time)
                ).includes(query)
            }
            return normalizeText(
                mo.description +
                mo.time +
                mo.value +
                formatTimestamp(mo.time)
            ).includes(query)
        })

        setFoundeds(foundedsMovimentations)
        setShowFoundedsWindow(true)
    }

    return (
        <>
            <HeaderWithMenu title='Histórico' />
            <main className={styles.main} >
                <h2>Movimentações</h2>
                <section className={styles.search} >
                    <Input
                        type='text'
                        id='inputSearch'
                        onChange={setInputSearch}
                        label='Algum dado da movimentação: '
                        placeholder='Inisira valor, data, descrição'
                    />
                    <button
                        className={styles.buttonSearch}
                        onClick={searchMovementation}
                    >
                        Pesquisar
                    </button>
                </section>
                <section className={styles.sectionMovimentations} >
                    {movementations.length == 0 ? (
                        <p>Nenhuma movimentação encontrada.</p>
                    ) : (
                        movementations.map((m, i) => (
                            <MovimentationItem
                                key={i}
                                time={m.time}
                                value={m.value}
                                category={m.category}
                                description={m.description}
                                handleEdit={editMovimentation}
                                handleRemove={deleteMovimentation}
                            />
                        ))
                    )}
                    {showMessageRemovedHistory && (
                        <MessagePopup
                            setShowMessage={setShowMessageRemovedHistory}
                            message='Movimentação removida!'
                        />
                    )}
                    {showWindowEditMovementation && (
                        <EditMovimentationWindow
                            setShow={setShowWindowEditMovementation}
                            movementationToEdit={actualMovementationToEdit}
                            setMoneyInputs={setMoneyInputs}
                            setMoneyOutputs={setMoneyOutputs}
                        />
                    )}
                    {showFoundedsWindow && (
                        <div className={styles.overlay} >
                            <div className={styles.window} >
                                <div className={styles.windowHeader} >
                                    <h1>Movimentações encontradas</h1>
                                    <button
                                        className={styles.buttonClose}
                                        onClick={() => setShowFoundedsWindow(false)}
                                    >
                                        X
                                    </button>
                                </div>
                                <div className={styles.windowBody} >
                                    {foundeds.length == 0 ? (
                                        <p>Nenhuma movimentação encontrada.</p>
                                    ) : (
                                        foundeds.map((m, i) => (
                                            <MovimentationItem
                                                key={i}
                                                time={m.time}
                                                value={m.value}
                                                category={m.category}
                                                description={m.description}
                                                handleEdit={editMovimentation}
                                                handleRemove={deleteMovimentation}
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </>
    )
}
