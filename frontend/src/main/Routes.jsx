import React from 'react'
import { Route, Switch, Redirect } from 'react-router'

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'
import ContactCrud from '../components/user/ContactCrud'
//import Login from '../components/template/Login'

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={UserCrud} />
        <Route path='/contacts' component={ContactCrud} />
        {/*<Route path='/login' component={Login} />*/}
        <Redirect from='*' to='/' />
    </Switch>