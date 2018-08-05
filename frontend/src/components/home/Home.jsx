import React from 'react'
import Main from '../template/Main'
import Login from '../template/Login'

export default props =>
    <Main icon="fa fa-home" title="Início" subtitle="Teste prático Oficina5">
        <div className="display-4">Bem-vindo!</div>
        <Login />
    </Main>