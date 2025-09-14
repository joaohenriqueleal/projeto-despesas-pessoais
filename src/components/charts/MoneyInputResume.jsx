import styles from '../../styles/ChartsStyles/MoneyInputResume.module.css'

import loadActualUser from '../../utils/loadActualUser'
import formatPrice from '../../utils/pricesManagers/formatPrice'
import loadMoneyInputs from '../../utils/pricesManagers/loadMoneyInputs'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Bar } from 'react-chartjs-2'
import { useMemo } from 'react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels)

export default function MoneyInputResume({
    title = 'Entradas',
    showLegend = true,
    stacked = false,
    selectedTime = 'all'
}) {
    const actualUser = loadActualUser()
    const moneyInputs = loadMoneyInputs(actualUser)

    const { labels, values } = useMemo(() => {
        if (!moneyInputs || moneyInputs.length === 0) return { labels: [], values: [] }

        const now = Date.now()
        let startTime = 0

        switch (selectedTime) {
            case 'today':
                startTime = new Date().setHours(0, 0, 0, 0)
                break
            case '7d':
                startTime = now - 7 * 24 * 60 * 60 * 1000
                break
            case '30d':
                startTime = now - 30 * 24 * 60 * 60 * 1000
                break
            case 'year':
                startTime = now - 365 * 24 * 60 * 60 * 1000
                break
            case 'all':
            default:
                startTime = 0
        }

        const filtered = moneyInputs.filter((entry) => entry.time >= startTime)

        const labels = filtered.map((entry) => {
            const date = new Date(entry.time)
            if (selectedTime === 'year' || selectedTime === 'all') {
                return `${date.getMonth() + 1}/${date.getFullYear()}`
            } else {
                return date.toLocaleString('pt-BR')
            }
        })

        const values = filtered.map((entry) => entry.value)

        return { labels, values }
    }, [moneyInputs, selectedTime])

    const data = {
        labels,
        datasets: [
            {
                label: 'Entradas monetárias',
                data: values,
                borderWidth: 1,
                backgroundColor: '#4ade80',
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: showLegend,
                position: 'top',
            },
            title: {
                display: !!title,
                text: title,
            },
            datalabels: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.raw
                        return `Entrada: ${formatPrice(value)}`
                    }
                }
            }
        },
        scales: {
            x: {
                stacked,
                title: {
                    display: true,
                    text: 'Data',
                },
            },
            y: {
                stacked,
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Valor',
                },
            },
        },
    }

    return (
        <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-md rounded-2xl">
            <div className={styles.chartContent} >
                <Bar data={data} options={options} />
            </div>
        </div>
    )
}
