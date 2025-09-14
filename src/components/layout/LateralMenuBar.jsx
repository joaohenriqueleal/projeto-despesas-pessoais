import styles from '../../styles/LayoutStyles/LateralMenuBar.module.css'
import stylesLapTop from '../../styles/LayoutStyles/LateralMenuBarLapTop.module.css'

import { FiLogOut } from 'react-icons/fi'
import { Link } from 'react-router-dom'


export default function LateralMenuBar({ setShow }) {
    return (
        <div
            className={styles.overlay}
            onClick={() => setShow(false)}
        >
            <nav
                className={`${styles.nav} ${stylesLapTop.nav}`}
                onClick={(e) => e.stopPropagation()}
            >
                <h1>Opções</h1>
                <div className={styles.options} >
                    <Link to='/' className={styles.link} >Home</Link>
                    <Link to='/categorias' className={styles.link} >Categorias</Link>
                    <Link to='/history' className={styles.link} >Histórico</Link>
                    <Link to='/registro' className={styles.link} >Nova conta +</Link>
                    <Link
                        className={`${styles.link} ${styles.logOutLink}`}
                        to='/login'
                    >
                        Sair <FiLogOut/>
                    </Link>
                </div>
            </nav>
        </div>
    )
}
