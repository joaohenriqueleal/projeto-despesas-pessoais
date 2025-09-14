import styles from '../../styles/ChartsStyles/ResumeGoals.module.css'
import { useState, useEffect } from 'react'

import loadMoneyOutputs from '../../utils/pricesManagers/loadMoneyOutputs'
import loadCategories from '../../utils/categorysManagers/loadCategories'
import formatPrice from '../../utils/pricesManagers/formatPrice'
import loadActualUser from '../../utils/loadActualUser'

import ResumeGoalCategoryItem from '../ResumeGoalCategoryItem'

export default function ResumeGoals({ selectedTime }) {
    const actualUser = loadActualUser()
    const [categories, setCategories] = useState([])
    const [moneyOutputs, setMoneyOutputs] = useState([])

    useEffect(() => {
        setCategories(loadCategories(actualUser))
        setMoneyOutputs(loadMoneyOutputs(actualUser))
    }, [actualUser])

    const getDateRange = () => {
        const now = Date.now()
        let start

        switch (selectedTime) {
            case 'today': {
                const today = new Date()
                today.setHours(0, 0, 0, 0)
                start = today.getTime()
                break
            }
            case '7d':
                start = now - 7 * 24 * 60 * 60 * 1000
                break
            case '30d':
                start = now - 30 * 24 * 60 * 60 * 1000
                break
            case 'year': {
                const firstDayYear = new Date(new Date().getFullYear(), 0, 1)
                firstDayYear.setHours(0,0,0,0)
                start = firstDayYear.getTime()
                break
            }
            case 'all':
            default:
                start = 0
        }

        return { start, end: now }
    }

    const filterByTime = (arr) => {
        if (!Array.isArray(arr)) return []
        const { start, end } = getDateRange()

        return arr.filter(mo => {
            if (!mo) return false
            const raw = mo.timestamp ?? mo.time ?? mo.date ?? null
            const ts = raw === null ? NaN : Number(raw)
            if (Number.isNaN(ts)) return false
            return ts >= start && ts <= end
        })
    }

    const computeTotalExpensesOfCategory = (categoryName) => {
        if (!Array.isArray(moneyOutputs)) return 0
        const filtered = filterByTime(moneyOutputs)
        let total = 0

        filtered.forEach((mo) => {
            const value = Number(mo?.value ?? 0)
            const moCat = (mo?.category ?? '').toString().trim()
            if (moCat === categoryName) total += (Number.isFinite(value) ? value : 0)
        })

        return total
    }

    const sumCatrgoriesGoal = () => {
        let total = 0
        categories.map((c) => {
            total += Number(c.goal)
        }); return total
    }

    return (
        <div className={styles.container} >
            <p className={styles.totalGoals} >
                Total que você pretende gastar: {formatPrice(sumCatrgoriesGoal())}
            </p>
            {categories.length === 0 ? (
                <p className={styles.pNoCategories}>
                    Nenhuma categoria encontrada.
                </p>
            ) : (
                categories.map((c, i) => (
                    <ResumeGoalCategoryItem
                        key={i}
                        name={c.name}
                        goal={c.goal}
                        totalExpenses={computeTotalExpensesOfCategory(c.name)}
                    />
                ))
            )}
        </div>
    )
}
