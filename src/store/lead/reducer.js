import { createSlice } from '@reduxjs/toolkit'

const leadSlice = createSlice({
  name: 'lead',
  initialState: {
    processingLead: {},
    leadDecisionSucess: false,
    leads: { Items: [] }
  },
  reducers: {
    GetLeadSuccess: (state, action) => {
      state.processingLead = action.payload
    },
    GetLeadsSuccess: (state, action) => {
      state.leads = action.payload
    },
    processLeadSucess: (state, action) => {
      state.leadDecisionSucess = action.payload
    },
    EmptyStateAttr: (state, action) => {
      state[action.payload] = {}
    }
  }
})

export default leadSlice
