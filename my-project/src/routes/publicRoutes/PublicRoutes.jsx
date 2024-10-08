import {Navigate} from 'react-router-dom'
import React from 'react'

function PublicRoutes(props) {
      if(localStorage.getItem('token')){
        return <Navigate to='/' />
      }else{
        <Navigate to='/login'/>
        return props.children
      }

    }

export default PublicRoutes