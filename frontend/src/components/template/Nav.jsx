import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <Link to="/">
            <i className="fa fa-home">Home</i>
        </Link>
        <Link to="/users">
            <i className="fas fa-user-tie">Usuários</i>
        </Link>
        <Link to="/contacts">
            <i className="fa fa-users">Contatos</i>
        </Link>
    </aside>