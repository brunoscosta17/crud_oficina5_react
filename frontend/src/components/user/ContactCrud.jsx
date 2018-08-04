import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'
import Nav from '../template/Nav'
import { Link } from 'react-router-dom'

const headerProps = {
    icon: 'fa fa-users',
    title: 'Contatos',
    subtitle: 'Cadastro de Contatos: Incluir, Listar, Alterar e Excluir'
}

const baseUrl = 'mongodb://localhost/oficina5'

const initialState = {
    contact: {name: '', email: '', phone: '', birth: ''},
    list: []
}

export default class ContactCrud extends Component {

    state = {...initialState }

    componentWillMount() { // metodo de ciclo de vida
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ contact: initialState.contact })
    }

    save() {
        const contact = this.state.contact
        const method = contact.id ? 'put' : 'post'
        const url = contact.id ? `${baseUrl}/${contact.id}` : baseUrl
        axios[method](url, contact)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ contact: initialState.contact, list })
            })
    }

    getUpdatedList(contact, add = true) {
        const list = this.state.list.filter(u => u.id !== contact.id)
        if(add) list.unshift(contact)
        return list
    }

    updateField(event) {
        const contact = { ...this.state.contact }
        contact[event.target.name] = event.target.value
        this.setState({ contact })
    }

    renderForm() {
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" 
                                className="form-control" 
                                name="name" 
                                value={this.state.contact.name} 
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="email" 
                                className="form-control" 
                                name="email" 
                                value={this.state.contact.email} 
                                onChange={e => this.updateField(e)}
                                placeholder="user@mail.com" required />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Telefone</label>
                            <input type="tel"
                                placeholder="12-3456-7890"
                                pattern="\(\d{2}\)\d{4}-\d{4}"
                                required 
                                className="form-control" 
                                name="phone" 
                                value={this.state.contact.phone} 
                                onChange={e => this.updateField(e)}
                                 />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Data de Nascimento</label>
                            <input type="text" 
                                className="form-control" 
                                name="birth" 
                                value={this.state.contact.birth} 
                                onChange={e => this.updateField(e)}
                                placeholder="dd/mm/aaaa" />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
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
                                value={this.state.contact.search} 
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a busca..." />
                        </div>
                    </div>
            </div>
        )
    }

    load(contact) {
        this.setState({ contact })
    }

    remove(contact) {
        axios.delete(`${baseUrl}/${contact.id}`).then(resp =>{
            const list = this.getUpdatedList(contact, false)
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
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Data de Nascimento</th>
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
            this.state.list.map(contact => {
                return(
                    <tr key={contact.id}>
                        <td>{contact.id}</td>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                        <td>{contact.birth}</td>
                        <td>
                            <button className="btn btn-warning"
                                onClick={() => this.load(contact)}>
                                <i className="fa fa-pencil"></i>
                            </button>
                            <button className="btn btn-danger ml-2"
                                onClick={() => this.remove(contact)}>
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