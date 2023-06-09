import axios from 'axios'
const BASE_URL = "http://localhost:5001/api/users"

// Register user
const register = async (userData) => {
    const res = await axios.post(`${BASE_URL}/register`, userData)

    return res.data
}

// Login user
const login = async (userData) => {
    const res = await axios.post(`${BASE_URL}/login`, userData)

    if(res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
    }

    return res.data
}

//Logout user

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login
}

export default authService