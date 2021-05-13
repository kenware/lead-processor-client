import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import Validator from 'validatorjs'
import lodash from 'lodash'

import { register } from '../../store/user/actions'
import { useDispatch, useSelector } from 'react-redux'

import './index.scss'

const Register = () => {
  const dispatch = useDispatch()
  const { registerError } = useSelector(state => state.user)
  const [inputField, setInputField] = useState({
    email: '',
    password: '',
    name: '',
    password_confirmation: ''
  })
  const [inputErrors, setInputError] = useState({
    email: '',
    password: '',
    name: ''
  })

  const onSubmit = () => {
    const rules = {
      email: 'required|email',
      password: 'required|min:8|confirmed',
      name: 'required|string'
    }
    setInputError({
      email: '',
      password: '',
      name: ''
    })
    const validation = new Validator(inputField, rules)
    const errors = {}
    if (validation.fails()) {
      lodash.forOwn(validation.errors.errors, (value, k) => {
        errors[k] = value[0]
      })
      setInputError(errors)
    } else {
      dispatch(register(inputField))
    }
  }

  const inputsHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value })
  }

  return (
   <div className="register center ">
    <h4 className="center header">Signup</h4>
    <span className="center red-text">{registerError}</span>
    <div className="row">
        <div className="input-field col s12 m6">
          <i className="material-icons prefix">account_circle</i>
          <input
            id="icon_prefix"
            type="text"
            onChange={inputsHandler}
            name="name"
            className="validate" />
          <label htmlFor="icon_prefix">Full name</label>
          <span className="red-text">{inputErrors.name}</span>
        </div>
        <div className="input-field col s12 m6">
          <i className="material-icons prefix">mail</i>
          <input
            id="icon_prefix"
            type="text"
            name="email"
            onChange={inputsHandler}
            className="validate" />
          <label htmlFor="icon_prefix">Email</label>
          <span className="red-text">{inputErrors.email}</span>
        </div>
      </div>
      <div className="row">
      <div className="input-field col s12 m6">
          <i className="material-icons prefix">lock</i>
          <input
             id="icon_telephone"
             type="tel"
             name="password"
             onChange={inputsHandler}
             className="validate" />
          <label htmlFor="icon_telephone">Password</label>
          <span className="red-text">{inputErrors.password}</span>
        </div>
        <div className="input-field col s12 m6">
          <i className="material-icons prefix">lock</i>
          <input
            id="icon_telephone"
            type="tel"
            name="password_confirmation"
            onChange={inputsHandler}
            className="validate" />
          <label htmlFor="icon_telephone">Verify Password</label>
        </div>
        <div className="button-dev row center">
        <button onClick={onSubmit} className="btn waves-effect waves-light center" type="submit" name="action">Submit
         <i className="material-icons right">send</i>
        </button>
        <h6 className="center header">Already have an account? <Link to="/login"> login</Link></h6>
        </div>
      </div>
  </div>
  )
}

export default Register
