import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import {Form, Field} from 'react-final-form'
import TextFieldAdapter from '../TextFieldAdapter'
import {Col, InputGroup, InputGroupAddon, InputGroupText, Row} from 'reactstrap'
import LoadingButton from '../LoadingButton'

import * as NewToDoActions from '../../actions/AuthActions'


export class Login extends Component {
  constructor() {
    super()

    this.state = {
      username: '',
      password: '',
    }
  }

  componentDidUpdate(prevProps) {

    if (!prevProps.isAdmin && this.props.isAdmin) {
      this.props.history.push('/list')
    }
  }

  requiredValidator = (value, values) => {
    return value ? undefined : 'Required'
  }

  render() {
    return (
      <div className="layout layout-center transparent-bg">
        <main className="flex">
          <Form
            onSubmit={async values => {
              const {username, password} = values

              if (username === 'administrator' && password === '123') {
                this.props.login()
              }
            }}
            initialValues={this.state}
            render={({handleSubmit, reset, submitting, validating, pristine, values}) => (
              <form onSubmit={handleSubmit} className="w-100">
                <InputGroup className="mb-2">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-user"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Field
                    disabled={submitting}
                    name="username"
                    id="username"
                    placeholder="Username"
                    component={TextFieldAdapter}
                    validate={this.requiredValidator}
                  />
                </InputGroup>
                <InputGroup className="mb-2">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-lock"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Field
                    disabled={submitting}
                    name="password"
                    id="password"
                    placeholder="Password"
                    type="password"
                    component={TextFieldAdapter}
                    validate={this.requiredValidator}
                  />
                </InputGroup>
                <Row>
                  <Col xs="12">
                    <div className="button">
                      <LoadingButton type="submit" color="primary" className="px-4 fl w-100">
                              Login
                      </LoadingButton>
                    </div>
                  </Col>
                </Row>
                <Row className="mt-1">
                  <Col xs="12">
                    <LoadingButton onClick={() => this.props.history.push('/list')} color="primary" className="px-4 fl w-100">
                    Back to List
                    </LoadingButton>
                  </Col>
                </Row>
              </form>
            )}
          />
        </main>
      </div>
    )
  }
}


const mapStateToProps = ({auth}) => {
  return auth
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({...NewToDoActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
