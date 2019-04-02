import React, {Component} from 'react'
import {Button} from 'reactstrap'
import Spinner from './Spinner'

class LoadingButton extends Component {
  render() {
    if (this.props.loading) {
      return <Button disabled {...this.props}><Spinner inline size="10" visible="true"></Spinner></Button>
    } else {
      return <Button {...this.props}></Button>
    }
  }
}

export default LoadingButton
