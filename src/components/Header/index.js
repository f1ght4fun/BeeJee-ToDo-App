import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {NavLink} from 'reactstrap'

import * as AuthActions from '../../actions/AuthActions'


export class Header extends Component {
  render() {
    return (
      <div className="header">
        {
          this.props.isAdmin &&
          <NavLink className="black fw6 f5 underline" href="#"
            onClick={() => this.props.logout()}>Logout
          </NavLink>
        }
        {
          !this.props.isAdmin &&
            <NavLink className="black fw6 f5 underline" href="#"
              onClick={() => this.props.history.push('/login')}>Login
            </NavLink>
        }
      </div>
    )
  }
}

const mapStateToProps = ({auth}) => {
  return auth
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({...AuthActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
