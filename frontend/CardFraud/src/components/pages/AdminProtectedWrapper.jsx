import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminDataContext } from '../Context/AdminContext'

const AdminProtectedWrapper = ({children}) => {
    const token = localStorage.getItem('adminToken') // Use the correct key
    const {url, setUser} = useContext(AdminDataContext)
    const navigate = useNavigate()
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        if (!token) {
            toast.error('Please login to continue')
            navigate('/login')
            return
        }

        axios.get(`${url}/admin/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                if (setUser) setUser(response.data)
                setIsLoading(false)
                // Do NOT navigate here!
                // toast.success('Login successful!') // Optional: remove or keep only for first login
            }
        })
        .catch(err => {
            console.log(err)
            localStorage.removeItem('adminToken')
            toast.error('Invalid credentials. Please login again.')
            navigate('/login')
        })
    }, [ token ])

    if (isLoading) {
        return (
            <div>
                <ToastContainer />
                Loading...
            </div>
        )
    }

    return (
        <>
            <ToastContainer />
            {children}
        </>
    )
}

export default AdminProtectedWrapper