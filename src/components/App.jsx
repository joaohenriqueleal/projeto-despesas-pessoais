import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import styles from '../styles/App.module.css'

import loadActualUser from '../utils/loadActualUser'

import Categories from '../pages/Categories'
import History from '../pages/History.jsx'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Home from '../pages/Home'

export default function App() {
    const [authenticated, setAuthenticated] = useState(!!loadActualUser())

    return (
        <div className={styles.container} >
            <Router>
                {authenticated ? (
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/home' element={<Home />} />
                        <Route path='/registro' element={<Register setAuthenticated={setAuthenticated} autoRedirect={false} />} />
                        <Route path='/login' element={<Login setAuthenticated={setAuthenticated} />} />
                        <Route path='/categorias' element={<Categories />} />
                        <Route path='/history' element={<History/>} />
                        <Route path='*' element={<Home />} />
                    </Routes>
                ) : (
                    <Routes>
                        <Route path='/' element={<Register setAuthenticated={setAuthenticated} autoRedirect={true} />} />
                        <Route path='/login' element={<Login setAuthenticated={setAuthenticated} />} />
                        <Route path='*' element={<Login setAuthenticated={setAuthenticated} />} />
                    </Routes>
                )}
            </Router>
        </div>
    )
}
