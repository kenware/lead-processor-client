import { render, screen } from './test-utils'
import Register from '../components/register'
// import { shallow } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'

test('Render login page', () => {
  // eslint-disable-next-line react/react-in-jsx-scope
  render(<Router><Register /></Router>, { initialState: { user: {}, processingLead: {} } })
  const linkElement = screen.getByText(/Login/i)
  expect(linkElement).toBeInTheDocument()
})
