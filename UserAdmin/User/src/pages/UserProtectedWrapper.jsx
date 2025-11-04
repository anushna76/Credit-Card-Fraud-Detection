import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../components/Context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const UserProtectWrapper = ({children}) => {

    const token = localStorage.getItem('token')
    const {url}=useContext(UserDataContext)
    const navigate = useNavigate()
    const [user, setUser ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        if (!token) {
            toast.error('Please login to continue')
            navigate('/login')
            return
        }

        axios.get(`${url}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data)
                setIsLoading(false)
                
            }
        })
            .catch(err => {
                console.log(err)
                localStorage.removeItem('token')
                toast.error('Invalid credentials. Please login again.')
                navigate('/login')
            })
    }, [ token ])

    if (isLoading) {
        return (
            <div>
               
                Loading...
            </div>
        )
    }

    return (
        <>
           
            {children}
        </>
    )
}

export default UserProtectWrapper