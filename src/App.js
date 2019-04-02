import './App.css'

import React from 'react'
import PropTypes from 'prop-types'
import {ConnectedRouter} from 'connected-react-router'
import {Route, Switch, Redirect} from 'react-router-dom'

import {Container} from 'reactstrap'
import NewToDoItem from './components/ToDo/Components/NewToDoItem'
import ToDoList from './components/ToDo/HOC'
import Header from './components/Header'
import Login from './components/Login'

const App = ({history}) => {
  return (
    <ConnectedRouter history={history}>
      <Container fluid className="centered flex-column">
        <Header />
        <Switch>
          <Route path="/list" name="list" component={ToDoList} />
          <Route path="/login" name="login" component={Login} />
          <Route path="/add" name="add" component={NewToDoItem} />
          <Redirect from="/" to="/list" />
        </Switch>
      </Container>
    </ConnectedRouter>
  )
}

App.propTypes = {
  history: PropTypes.object,
}

export default App
