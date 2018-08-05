import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'
import Nav from '../template/Nav'

const headerProps = {
    icon: 'fas fa-user-tie',
    title: 'Usuários',
    subtitle: 'Cadastro de Usuários: Incluir, Listar, Alterar e Excluir'
}

const baseUrl = 'http://localhost:3001'

const initialState = {
    user: {UserName: '', Password: '', ConfirmPassword: ''},
    list: []
}

export default class UserCrud extends Component {
    
    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }
    
    save() {
        const user = this.state.user // obtendo o user
        const method = user.id ? 'put' : 'post'
        const url = `${baseUrl}/user`;
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initialState.user, list })
                alert('Salvo com sucesso!')
            })
    }
    
    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }
    
    updateField(event) {
        const user = { ...this.state.user } // clonando o user para fazer update
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    checkRequired(value) {
        return !!value.trim();
    }

    renderForm() {
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label>Usuário</label>
                            <input type="text" 
                                className="form-control" 
                                name="UserName" 
                                value={this.state.user.UserName} 
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o usuário..."
                                errorMessage="Password is required" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label>Senha</label>
                            <input type="password" 
                                className="form-control" 
                                name="Password" 
                                value={this.state.user.Password} 
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a senha..."
                                errorMessage="Password is required"
                                validate={this.checkRequired} />
                        </div>
                    </div>
                </div>
                {/*<div className="row">
                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label>Confirme a senha</label>
                            <input type="password" 
                                className="form-control" 
                                name="ConfirmPassword" 
                                value={this.state.user.ConfirmPassword}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite novamente a senha..."
                                errorMessage="Password do not match"
                                validate={this.checkPasswordsMatch} />
                        </div>
                    </div>
                </div>
                */}  
                <hr />

                <div className="row">
                    <div className="col-12 d-flex justify-content-start">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar                            
                        </button>
                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>                    
                </div>

                <hr/>
                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label>Busca</label>
                            <input type="text" 
                                className="form-control" 
                                name="search" 
                                value={this.state.user.search} 
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a busca..." />
                        </div>
                    </div>
            </div>
        )
    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp =>{
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    renderTable(){
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Senha</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return(
            this.state.list.map(user => {
                return(
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.UserName}</td>
                        <td>{user.Password}</td>
                        <td>
                            <button className="btn btn-warning"
                                onClick={() => this.load(user)}>
                                <i className="fa fa-pencil"></i>
                            </button>
                            <button className="btn btn-danger ml-2"
                                onClick={() => this.remove(user)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                )
            })
        )
    }

    render() {
        return (
            <React.Fragment>
                <Nav />
                <Main {...headerProps}>
                    {this.renderForm()}
                    {this.renderTable()}
                </Main>
            </React.Fragment>
        )
    }
}