// import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import moment from 'moment-timezone'
import { useDispatch, useSelector } from 'react-redux'
import { getLead, processLead } from '../../store/lead/actions'
import { AlertModalPromise } from '../modals/modalAlert'
import './index.scss'

const Lead = () => {
  const dispatch = useDispatch()
  const { processingLead } = useSelector(state => state.lead)
  let timer

  useEffect(() => {
    dispatch(getLead())
  }, [])

  useEffect(() => {
    timer = setInterval(async () => {
      if (processingLead.timestamp) {
        const start = moment(processingLead.timestamp).tz('UTC')
        const now = moment(moment.utc().format('YYYY.MM.DD HH:mm:ss')).tz('UTC')
        console.log(now.diff(start, 'seconds'))
        if ((now.diff(start, 'seconds')) >= 120) {
          console.log(now.diff(start, 'seconds'))
          clearInterval(timer)
          const title = 'Session Expired'
          const text = 'Page will be refreshed because session has expired'
          AlertModalPromise({ title, text, useIcon: false }).then(() => dispatch(getLead()))
        }
      }
    }, 5000)

    return () => {
      clearInterval(timer)
    }
  }, [processingLead])

  const makeDecision = (decision) => {
    const { emailLeadId } = processingLead
    const data = { decision, emailLeadId }
    if (data.emailLeadId) {
      dispatch(processLead(data))
    }
  }

  return (
   <div className="dashboard">
    <h5 className="center header">Lead Processing Dashboard</h5>
    <div className="dashboard-wrapper center">
        <div className="row">
            <div className="col s4">
               <a
                onClick={() => makeDecision('Positive reply')}
                className="waves-effect waves-light btn-small decision-btn">
                Positive reply</a>
            </div>
            <div className="col s4">
               <a
                onClick={() => makeDecision('Neutral reply')}
                className="waves-effect waves-light btn-small decision-btn">
                Neutral reply</a>
            </div>
            <div className="col s4">
                <a
                onClick={() => makeDecision('Not a lead')}
                className="waves-effect waves-light btn-small decision-btn">
                Not a lead</a>
            </div>
        </div>
        <div className="lead-content">
            <h6 className="lead-subject">{processingLead.subject?.toUpperCase()}</h6>
            <div className="lead-body">
                {processingLead.body}
            </div>
        </div>
    </div>

  </div>
  )
}

export default Lead
