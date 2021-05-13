import axios from 'axios'
import lodash from 'lodash'
import { AlertModal } from '../../components/modals/modalAlert'
import slice from './reducer'
import leadSlice from '../user/reducer'

const { GetLeadSuccess, EmptyStateAttr, processLeadSucess, GetLeadsSuccess } = slice.actions
const { loaderToggle } = leadSlice.actions

const getErrors = (error) => {
  let newError = ''
  if (lodash.isString(error)) {
    return error
  } else {
    lodash.forOwn(error, (v, k) => {
      newError += v[0]
    })
  }
  return newError
}

export const getLead = () => async dispatch => {
  try {
    dispatch(loaderToggle(true))
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/emails/lead`)
    console.log(res)
    dispatch(GetLeadSuccess(res.data))
    return dispatch(loaderToggle(false))
  } catch (e) {
    const error = getErrors(e.response?.data?.message)
    dispatch(EmptyStateAttr('processingLead'))
    dispatch(loaderToggle(false))
    AlertModal('Request Info', error, 'warning')
  }
}

export const getLeads = (query) => async dispatch => {
  try {
    dispatch(loaderToggle(true))
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/emails/leads?status=${query}`)
    dispatch(GetLeadsSuccess(res.data))
    dispatch(loaderToggle(false))
  } catch (e) {
    const error = getErrors(e.response?.data?.message)
    dispatch(EmptyStateAttr('processingLead'))
    dispatch(loaderToggle(false))
    AlertModal('Request Info', error, 'warning')
  }
}

export const processLead = (data) => async dispatch => {
  try {
    dispatch(loaderToggle(true))
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/emails/leads/decision`, data)
    dispatch(processLeadSucess(res.data))
    return dispatch(getLead())
  } catch (e) {
    const error = getErrors(e.response?.data?.message)
    dispatch(EmptyStateAttr('leadDecisionSucess'))
    dispatch(loaderToggle(false))
    AlertModal('Request Info', error, 'warning')
  }
}

export const processStatus = (data, status) => async dispatch => {
  try {
    dispatch(loaderToggle(true))
    await axios.post(`${process.env.REACT_APP_BASE_URL}/emails/leads/status`, data)
    return dispatch(getLeads(status))
  } catch (e) {
    const error = getErrors(e.response?.data?.message)
    dispatch(loaderToggle(false))
    AlertModal('Request Info', error, 'warning')
  }
}
