import React from 'react'
import {Input} from 'reactstrap'

const TextFieldAdapter = ({input, meta, id, onChange, ...rest}) => (
  <React.Fragment>
    <Input
      {...input}
      {...rest}
      id={id}
      className={meta.error && meta.touched ? 'is-invalid' : (meta.touched ? 'is-valid' : '')}
      onChange={(event) => {
        input.onChange(event.target.value)

        if (onChange) {
          onChange(event)
        }
      }}
    />
    {meta.error && meta.touched && <em id={id + '-error'} className="error invalid-feedback fw6">{meta.error}</em>}
  </React.Fragment>
)

export default TextFieldAdapter
