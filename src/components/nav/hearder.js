import { Link, useLocation } from 'react-router-dom'
import React from 'react'
import brand from '../../images/lead-img.png'
import { useDispatch, useSelector } from 'react-redux'
import { logout, changeUserStatus } from '../../store/user/actions'

import './nav.scss'

const Header = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const location = useLocation()

  const logoutUser = () => {
    dispatch(logout())
  }

  const seUserAway = (status) => {
    dispatch(changeUserStatus(status, location.pathname))
  }

  return (
<div className="">
    <ul id="dropdown1" className="dropdown-content">
     {user?.isActive
       ? (<li>< a onClick={() => seUserAway(false)} href="#!">Go Away</a></li>)
       : (<li>< a onClick={() => seUserAway(true)} href="#!">Set Active</a></li>)}

    <li className="divider"></li>
    <li><a onClick={() => logoutUser()} href="#!">Logout</a></li>
    </ul>
    <nav className="nav nav-fixed-bar white">
        <div className="nav-wrapper">
            <Link className="brand-logo" to="/">
              <img className="logo-img" src={brand} alt="logo" />
            </Link>
            <a data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
                {user?.email
                  ? <li><Link to="/dashboard">Lead</Link></li>
                  : (<li>
                    <Link to="/home">Signup</Link>
                </li>)}
                <li>
                  {user?.isAdmin
                    ? <Link to="/admin">Admin</Link>
                    : <span/>
                  }

                </li>
                <li><a href="##">{user?.email}</a></li>
                <li><a className="dropdown-trigger" href="#!" data-target="dropdown1">
                    <div className="row">
                    <i className="col material-icons icon-menu-fix">person</i>
                    <i className="col material-icons icon-menu-fix">arrow_drop_down</i>
                    </div></a>
                </li>
            </ul>
        </div>
    </nav>
    <ul className="sidenav" id="mobile-demo">
    {user?.email
      ? <li><Link to="/dashboard">Lead</Link></li>
      : (<li>
        <Link to="/home">Signup</Link>
        </li>)}
        <li>
            {user?.isAdmin
              ? <Link to="/admin">Admin</Link>
              : <span/>
            }

        </li>
        {user?.isActive
          ? (<li>< a onClick={() => seUserAway(false)} href="#!">Go Away</a></li>)
          : (<li>< a onClick={() => seUserAway(true)} href="#!">Set Active</a></li>)}

        </ul>
</div>
  )
}

export default Header
