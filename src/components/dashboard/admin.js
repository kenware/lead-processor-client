import React, { useEffect, useState } from 'react'
import moment from 'moment-timezone'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { getLeads, processStatus } from '../../store/lead/actions'
import './index.scss'

const Admin = () => {
  const options = [
    { value: 'Done', label: 'Done', isDisabled: true },
    { value: 'InProgress', label: 'In Progress', isDisabled: true },
    { value: 'Pending', label: 'Pending' }
  ]

  const [selectedOption, setSelectedOption] = useState(options[0].value)

  const dispatch = useDispatch()
  const { leads } = useSelector(state => state.lead)

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption)
    dispatch(getLeads(selectedOption))
  }

  useEffect(() => {
    dispatch(getLeads(selectedOption))
    // eslint-disable-next-line no-undef
    $('.m-select').on('change', (e) => handleChange($('.m-select').val()))
    // eslint-disable-next-line no-undef
    M.AutoInit()
  }, [])

  const changeStatus = (option, item) => {
    const data = { }
    data.status = option.value
    data.emailLeadId = item.emailLeadId
    if (data.emailLeadId) {
      dispatch(processStatus(data, selectedOption))
    }
  }

  return (
   <div className="dashboard admin">
    <h4 className="center header">Lead Processing Administration</h4>
    <div className="dashboard-wrapper center">
        <div className="row">
            <div className="input-field col s4">
            <select className="m-select">
            <option value="" disabled>Select option to filter</option>
            {options.map((item, i) => (
               <option key={i} value={item.value}>{item.label}</option>
            ))}
            </select>
            <label>Filter Leads By Status</label>
        </div>
        </div>
        <div className="">
            <h4 className="lead-subject">List of leads</h4>
            <div className="">
            <table className="responsive-table striped highlight">
        <thead>
        <tr>
            <th>Email Address</th>
            <th>Status</th>
            <th>{ options[0].value === selectedOption ? 'Decision' : '' }</th>
            <th>Subject</th>
            <th>Message Body</th>
            <th>Date Sent</th>
            <th>{ options[0].value === selectedOption ? 'Processed Date' : ''}</th>
            <th>{ options[0].value === selectedOption ? 'Resolved By' : ''}</th>
            <th>Actions/Change</th>
        </tr>
        </thead>

        <tbody>
        { leads.Items?.map((item, i) => (
        <tr key={i}>
            <td className="table-td" >{item.email} </td>
            <td className="table-td"> {item.status}</td>
            <td className="table-td"> {options[0].value === selectedOption ? item.decision : ''}</td>
            <td className="table-td"> {item.subject}</td>
            <td className="table-td"><span className="table-body">{item.body}</span></td>
            <td className="table-td"> {item.date}</td>
            <td className="table-td" >
               { options[0].value === selectedOption ? moment(item.timestamp).tz('UTC').format('YYYY.MM.DD HH:mm:ss') : ''}</td>
            <td className="table-td">
                {options[0].value === selectedOption ? item.resolvedBy?.name + '-' + item.resolvedBy?.email : ''}</td>
            <td className="table-td">
            <Select
                value={options.find(x => x.value === item.status)}
                onChange={(e) => changeStatus(e, item)}
                options={options}/>
            </td>
        </tr>
        ))}
        </tbody>
    </table>
            </div>
        </div>
    </div>

  </div>
  )
}

export default Admin
