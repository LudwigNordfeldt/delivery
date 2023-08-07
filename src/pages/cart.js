import { useSelector } from "react-redux"
import { useState } from "react"
import { Box, TextField, FormControl, Typography } from "@mui/material"

import CaptchaTest from '../components/captcha'
import Checkout from "../components/checkout"
import CouponInput from "../components/couponInput"

import OrderedFoodList from "../components/orderedFoodList"

export const sum = (list) => {
    return list.map(el => el.cost*el.number).reduce((prevsum, curr) => prevsum + curr, 0)
}

const Cart = ({user}) => {
    const order = useSelector(state => state.order)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [discount, setDiscount] = useState(0)

    return (<Box sx={{display: 'grid', gridAutoFlow: 'column'}}>
        <FormControl>
            <TextField sx={{padding: '10pt'}} value={name} type="text" label="Name" onChange={({target}) => setName(target.value)}></TextField>
            <TextField sx={{padding: '10pt'}} value={email} type="email" label="Email" onChange={({target}) => setEmail(target.value)}></TextField>
            <TextField sx={{padding: '10pt'}} value={phone} label="Phone" onChange={({target}) => setPhone(target.value)}></TextField>
            <TextField sx={{padding: '10pt'}} value={address} type="text" label="Address" onChange={({target}) => setAddress(target.value)}></TextField>
            <CaptchaTest sx={{padding: '10pt'}}/>
            <CouponInput user={user} discount={setDiscount}/>
            <Checkout user={user} discount={discount}/>
        </FormControl>
        <div>
            <OrderedFoodList></OrderedFoodList>
            <Typography variant="h6" component="div">Total: {sum(order)*(1-discount)}</Typography>
        </div>
        
    </Box>)
}

export default Cart