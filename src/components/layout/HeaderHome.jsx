import styles from '../../styles/LayoutStyles/HeaderHome.module.css'
import formatPrice from '../../utils/pricesManagers/formatPrice'
import LoadActualUser from '../../utils/loadActualUser'
import { useEffect, useState, useMemo } from 'react'
import Menu from '../layout/Menu'

export default function HeaderHome({ moneyInputs, moneyOutputs, setTime }) {
    const actualUser = LoadActualUser()
    const [totalColor, setTotalColor] = useState()
    const [selectedTime, setSelectedTime] = useState('30d')

    const handleClickSetTime = (time) => {
        setTime(time)
        setSelectedTime(time)
    }

    const filterByTime = (arr, timeRange) => {
        const now = Date.now()
        let startTime = 0

        switch (timeRange) {
            case 'today': {
                const startOfDay = new Date()
                startOfDay.setHours(0, 0, 0, 0)
                startTime = startOfDay.getTime()
                break
            }
            case '7d':
                startTime = now - 7 * 24 * 60 * 60 * 1000
                break
            case '30d':
                startTime = now - 30 * 24 * 60 * 60 * 1000
                break
            case 'year': {
                const startOfYear = new Date(new Date().getFullYear(), 0, 1)
                startTime = startOfYear.getTime()
                break
            }
            case 'all':
            default:
                startTime = 0
        }

        return arr.filter(item => item.time >= startTime)
    }

    const filteredInputs = useMemo(
        () => filterByTime(moneyInputs, selectedTime),
        [moneyInputs, selectedTime]
    )
    const filteredOutputs = useMemo(
        () => filterByTime(moneyOutputs, selectedTime),
        [moneyOutputs, selectedTime]
    )

    const totalInputs = useMemo(
        () => filteredInputs.reduce((sum, i) => sum + i.value, 0),
        [filteredInputs]
    )
    const totalOutputs = useMemo(
        () => filteredOutputs.reduce((sum, o) => sum + o.value, 0),
        [filteredOutputs]
    )

    useEffect(() => {
        if (totalInputs - totalOutputs < 0) {
            setTotalColor('red')
        } else {
            setTotalColor('rgba(64, 233, 30, 1)')
        }
    }, [totalInputs, totalOutputs])

    return (
        <header className={styles.header} >
            <div className={styles.menuTitle} >
                <Menu />
                <h2>{actualUser}</h2>
            </div>
            <hr className={styles.hr} />
            <p>Balanço final: 
                <span className={styles.price} style={{color: totalColor}} >
                    {formatPrice(totalInputs - totalOutputs)}
                </span>
            </p>
            <p>Entradas: 
                <span className={`${styles.price} ${styles.inputs}`} >
                    {formatPrice(totalInputs)}
                </span>
            </p>
            <p>Saídas: 
                <span className={`${styles.price} ${styles.outputs}`} >
                    -{formatPrice(totalOutputs)}
                </span>
            </p>
            <div className={styles.barSelectTime} >
                <button
                    className={`${styles.buttonSelectTime} ${selectedTime === 'today' ? styles.activeButton : ''}`}
                    onClick={() => handleClickSetTime('today')}
                >
                    Hoje
                </button>
                <button
                    className={`${styles.buttonSelectTime} ${selectedTime === '7d' ? styles.activeButton : ''}`}
                    onClick={() => handleClickSetTime('7d')}
                >
                    7d
                </button>
                <button
                    className={`${styles.buttonSelectTime} ${selectedTime === '30d' ? styles.activeButton : ''}`}
                    onClick={() => handleClickSetTime('30d')}
                >
                    30d
                </button>
                <button
                    className={`${styles.buttonSelectTime} ${selectedTime === 'year' ? styles.activeButton : ''}`}
                    onClick={() => handleClickSetTime('year')}
                >
                    Ano
                </button>
                <button
                    className={`${styles.buttonSelectTime} ${selectedTime === 'all' ? styles.activeButton : ''}`}
                    onClick={() => handleClickSetTime('all')}
                >
                    Tudo
                </button>
            </div>
        </header>
    )
}
