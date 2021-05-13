import { Link } from 'react-router-dom'
import Validator from 'validatorjs'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { login } from '../../store/user/actions'

import './index.scss'

const Login = () => {
  const dispatch = useDispatch()
  const { loginError } = useSelector(state => state.user)
  const [inputField, setInputField] = useState({
    email: '',
    password: ''
  })
  const [inputErrors, setInputError] = useState({
    email: '',
    password: ''
  })

  const onSubmit = () => {
    const rules = {
      email: 'required|email',
      password: 'required|min:8'
    }
    const validation = new Validator(inputField, rules)
    if (validation.fails()) {
      const errors = {
        email: validation.errors.first('email'),
        password: validation.errors.first('password')
      }
      setInputError(errors)
    } else {
      dispatch(login(inputField))
    }
  }

  const inputsHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value })
  }

  return (
   <div className="login center ">
    <h4 className="center header">Login</h4>
    <span className="center red-text">{loginError}</span>
    <div className="row">
        <div className="input-field col s12">
          <i className="material-icons prefix">mail</i>
          <input
            onChange={inputsHandler}
            name="email"
            id="email"
            type="text"
            className="validate" />
          <label htmlFor="icon_prefix">Email</label>
          <span className="red-text">{inputErrors.email}</span>
        </div>
      </div>
      <div className="row">
      <div className="input-field col s12">
          <i className="material-icons prefix">lock</i>
          <input
            onChange={inputsHandler}
            name="password"
            id="icon_telephone" type="tel" className="validate" />
          <label htmlFor="icon_telephone">Password</label>
          <span className="red-text">{inputErrors.password}</span>
        </div>
        <div className="input-field col s12 button-dev left">
        <button onClick={onSubmit} className="btn waves-effect waves-light" type="submit" name="action">Submit
         <i className="material-icons right">send</i>
        </button>
        <h6 className="center header">This is your first time? <Link to="/register">Register</Link></h6>
        </div>
      </div>
  </div>
  )
}

export default Login
