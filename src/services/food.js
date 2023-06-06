import axios from 'axios'

const getFood = async () => {
    const res = await axios.get('/food')
    return res.data
}

export default { getFood }