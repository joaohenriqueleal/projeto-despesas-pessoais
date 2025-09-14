import { useState, useEffect } from 'react'
import styles from '../styles/ResumeGoalCategoryItem.module.css'
import formatPrice from '../utils/pricesManagers/formatPrice'

export default function ResumeGoalCategoryItem({ name, totalExpenses, goal }) {
    const computePercent = () => (goal > 0 ? (totalExpenses / goal) * 100 : 0)

    const [barWidth, setBarWidth] = useState('0%')
    const [barColor, setBarColor] = useState('green')
    const [pGoalColor, setPGoalColor] = useState('green')

    useEffect(() => {
        const percent = computePercent()

        setBarWidth(percent >= 100 ? '99%' : `${percent.toFixed(2)}%`)

        if (percent < 50) setBarColor('green')
        else if (percent < 75) setBarColor('orange')
        else if (percent < 100) setBarColor('rgba(255, 85, 0, 1)')
        else setBarColor('red')

        setPGoalColor(percent >= 100 ? 'red' : 'green')
    }, [totalExpenses, goal])

    return (
        <div className={styles.container} >
            <p className={styles.pName}>{name}</p>
            <div className={styles.tool}>
                <div className={styles.barContent}>
                    <div
                        className={styles.bar}
                        style={{
                            width: barWidth,
                            backgroundColor: barColor,
                        }}
                    >
                        <p>{computePercent() === 0 ? 0 : computePercent().toFixed(0)}%</p>
                    </div>
                </div>
                <div className={styles.expensesInfos}>
                    <p className={styles.pUsedGoal}>
                        {formatPrice(totalExpenses)}
                    </p>
                    <p
                        className={styles.pGoal}
                        style={{ color: pGoalColor }}
                    >
                        {formatPrice(Number(goal))}
                    </p>
                </div>
            </div>
        </div>
    )
}
