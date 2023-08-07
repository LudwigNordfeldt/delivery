import axios from 'axios'

const getCoupons = async () => {
    const res = await axios.get('/coupons')
    return res.data
}

const useCoupon = async (user, coupon) => {
    const res = await axios.put(`/coupons/${coupon}`, {user})
    return res.data
}

export default { getCoupons, useCoupon }