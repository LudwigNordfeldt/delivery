import axios from 'axios'

const key = 'ArrQ_Cu3ZmkEku6CYm1MeN4axaZGHUTfU2h3URdHRb-OHuiEN4Fje9mViq1OHJyS'

const getRest = async () => {
    const res = await axios.get('/restaurant')
    return res.data
}

const getLoc = async (lat, long) => {
    const res = await axios.get(`https://dev.virtualearth.net/REST/v1/LocalSearch/?query=McDonalds&userCircularMapView=${lat},${long},5000&key=${key}`)
    return res.data
}

export default { getRest, getLoc }