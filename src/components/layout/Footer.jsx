import styles from '../../styles/LayoutStyles/Footer.module.css'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'


export default function Footer() {
    return (
        <footer className={styles.footer} >
            <p>
                <span className={styles.name} >
                    Costs
                </span>
                &copy;2025
            </p>
            <div className={styles.socialMedias} >
                <a
                    href='https://facebook.com'
                    className={styles.media}
                    target='_blank'
                >
                    <FaFacebook />
                </a>
                <a
                    href='https://instagram.com'
                    className={styles.media} 
                    target='_blank'
                >
                    <FaInstagram />
                </a>
                <a
                    href='https://linkedin.com'
                    className={styles.media}
                    target='_blank'
                >
                    <FaLinkedin />
                </a>
            </div>
        </footer>
    )
}
