import styles from '../../styles/LayoutStyles/HeaderWithMenu.module.css'
import Menu from "./Menu"


export default function HeaderWithMenu({ title }) {
    return (
        <header className={styles.header} >
            <Menu />
            <h1>{title}</h1>
        </header>
    )
}
