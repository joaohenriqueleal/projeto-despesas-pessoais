import LateralMenuBar from '../layout/LateralMenuBar'
import styles from '../../styles/LayoutStyles/Menu.module.css'

import { FaList } from 'react-icons/fa'
import { useState } from 'react'

export default function Menu() {
    const [showMenu, setShowMenu] = useState(false)

    const handleMenuClick = (e) => {
        e.stopPropagation()
        setShowMenu(true)
    }

    return (
        <div className={styles.menuContainer}>
            <div 
                className={styles.menuContent}
                onClick={handleMenuClick}
            >
                <FaList />
            </div>

            {showMenu && (
                <LateralMenuBar setShow={setShowMenu} />
            )}
        </div>
    )
}
