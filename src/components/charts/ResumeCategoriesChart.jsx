import styles from '../../styles/ChartsStyles/ResumeCategoriesChart.module.css'
import loadMoneyOutputs from '../../utils/pricesManagers/loadMoneyOutputs'
import loadCategories from '../../utils/categorysManagers/loadCategories'
import LoadActualUser from '../../utils/loadActualUser'
import { useEffect, useState, useMemo } from 'react'
import { Pie } from "react-chartjs-2"
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js"
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)


export default function PieChart({ selectedTime }) {
    const actualUser = LoadActualUser()
    const [categories, setCategories] = useState([])
    const [moneyOutputs, setMoneyOutputs] = useState([])

    useEffect(() => {
        setCategories(loadCategories(actualUser))
        setMoneyOutputs(loadMoneyOutputs(actualUser))
    }, [actualUser])

    const filteredOutputs = useMemo(() => {
        const now = Date.now()
        let startTime = 0

        switch (selectedTime) {
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

        return moneyOutputs.filter(mo => mo.time >= startTime)
    }, [moneyOutputs, selectedTime])

    const colors = useMemo(() => {
        return categories.map(() => {
            const r = Math.floor(Math.random() * 256)
            const g = Math.floor(Math.random() * 256)
            const b = Math.floor(Math.random() * 256)
            return {
                background: `rgba(${r}, ${g}, ${b}, 0.6)`,
                border: `rgba(${Math.floor(r * 0.5)}, ${Math.floor(g * 0.5)}, ${Math.floor(b * 0.5)}, 1)`
            }
        })
    }, [categories])

    const labels = categories.map(c => c.name)

    const dataValues = useMemo(() => {
        const totalsByCategory = {}
        let total = 0

        filteredOutputs.forEach(mo => {
            total += mo.value
            if (totalsByCategory[mo.category]) {
                totalsByCategory[mo.category] += mo.value
            } else {
                totalsByCategory[mo.category] = mo.value
            }
        })

        return categories.map(c => {
            const value = totalsByCategory[c.name] || 0
            return total > 0 ? (value / total * 100).toFixed(2) : 0
        })
    }, [categories, filteredOutputs])

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Participação (%)",
                data: dataValues,
                backgroundColor: colors.map(c => c.background),
                borderColor: colors.map(c => c.border),
                borderWidth: 1
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom"
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return context.dataset.label + ': ' + context.parsed + '%'
                    }
                }
            },
            datalabels: {
                color: '#fff',
                formatter: (value) => value + '%',
                font: {
                    weight: 'bold',
                    size: 14
                }
            },
            title: {
                display: true,
                text: "Participação por Categoria (%)"
            }
        }
    }

    return (
        <div className={styles.content} >
            <div className={styles.chart} >
                {categories.length == 0 ? (
                    <p className={styles.pNoCategories} >
                        Nenhuma categoria cadastrada.
                    </p>
                ) : (
                    <Pie data={data} options={options} />
                )}
            </div>
        </div>
    )
}
