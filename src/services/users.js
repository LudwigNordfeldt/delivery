import axios from "axios";

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const login = async (username, password) => {
    const response = await axios.post("/users/login", {username, password})
    return response.data
}

const register = async (username, name, password, email, phone, address) => {
    let user = {username, name, password, email, phone, address}
    const response = await axios.post("/users", user)
    return response.data
}

const addOrder = async (order, total, date, id) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.put(`/users/${id.user}`, {order, total, date}, config)
    return response.data
}

const getAll = async () => {
    const response = await axios.get("/users")
    return response.data
}

export default {login, register, setToken, addOrder, getAll}