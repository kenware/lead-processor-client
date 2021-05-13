import React from 'react'
import Loader from 'react-loader-spinner'
import './loader.scss'
import { useSelector } from 'react-redux'

const LoaderComponent = () => {
  const { loader } = useSelector(state => state.user)
  return (
  <div className="loader">
    {loader
      ? (
        <Loader
          type="Circles"
          color="#7cd1f9"
          height="100"
          width="100"
        />
        )
      : <span />
    }
  </div>
  )
}

export default LoaderComponent
