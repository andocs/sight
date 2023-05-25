import axios from 'axios'
const BASE_URL = "http://localhost:5001/api/users"

// Register user
const register = async (userData) => {
    const res = await axios.post(`${BASE_URL}/register`, userData)

    if(res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
    }

    return res.data
}

const authService = {
    register,
}

export default authService