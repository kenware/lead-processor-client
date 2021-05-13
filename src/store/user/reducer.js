import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loginError: null,
    isAuthenticated: false,
    registerError: null,
    loader: false
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    loginError: (state, action) => {
      state.loginError = action.payload
    },
    RegisterError: (state, action) => {
      state.registerError = action.payload
    },
    logoutSuccess: (state, action) => {
      state.user = null
    },
    loaderToggle: (state, action) => {
      state.loader = action.payload
    }
  }
})

export default userSlice
