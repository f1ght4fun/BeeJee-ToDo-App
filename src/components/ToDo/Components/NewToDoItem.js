import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {Form, Field} from 'react-final-form'
import TextFieldAdapter from '../../TextFieldAdapter'
import {Col, InputGroup, InputGroupAddon, InputGroupText, Row} from 'reactstrap'
import LoadingButton from '../../LoadingButton'

import {getNewItemState} from '../../../selectors'
import * as NewToDoActions from '../../../actions/NewToDoActions'


export class NewToDoItem extends Component {
  constructor() {
    super()

    this.state = {
      username: '',
      email: '',
      text: '',
    }
  }

  requiredValidator = (value, values) => {
    return value ? undefined : 'Required'
  }

  emailValidator = (value, values) => {
    if (value) {
      //eslint-disable-next-line
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(value).toLowerCase()) ? undefined : 'Enter valid email'
    } else {return 'Required'}
  }

  render() {
    return (
      <div className="layout layout-center transparent-bg">
        <main className="flex">
          <Form
            onSubmit={async values => {
              this.props.addNewToDo(values)
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
                      <i className="icon-envelope-letter"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Field
                    disabled={submitting}
                    name="email"
                    id="email"
                    placeholder="Email"
                    component={TextFieldAdapter}
                    validate={this.emailValidator}
                  />
                </InputGroup>
                <InputGroup className="mb-2">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-note"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Field
                    disabled={submitting}
                    name="text"
                    id="text"
                    placeholder="Task"
                    component={TextFieldAdapter}
                    validate={this.requiredValidator}
                  />
                </InputGroup>
                <Row>
                  <Col xs="12">
                    <div className="button">
                      <LoadingButton type="submit" color="primary" className="px-4 fl w-100"
                        loading={this.props.loading ? 'true' : undefined}>
                              Add
                      </LoadingButton>
                    </div>
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


const mapStateToProps = state => {
  return getNewItemState(state)
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({...NewToDoActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewToDoItem)
