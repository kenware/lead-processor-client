import { render, screen } from './test-utils'
import Login from '../components/login'
// import { shallow } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'

test('Render login page', () => {
  // eslint-disable-next-line react/react-in-jsx-scope
  render(<Router><Login /></Router>, { initialState: { user: {} } })
  const linkElement = screen.getByText(/Login/i)
  expect(linkElement).toBeInTheDocument()
})
