import { useSelector } from "react-redux"
import { useState } from "react"
import { Box, TextField, FormControl, Button, Typography } from "@mui/material"

import CaptchaTest from '../components/captcha'
import Checkout from "../components/checkout"

import OrderedFoodList from "../components/orderedFoodList"

export const sum = (list) => {
    return list.map(el => el.cost*el.number).reduce((prevsum, curr) => prevsum + curr, 0)
}

const Cart = ({user}) => {
    const order = useSelector(state => state.order)

    const placeOrder = () => {
        
    }

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    return (<Box sx={{display: 'grid', gridAutoFlow: 'column'}}>
        <FormControl onSubmit={placeOrder}>
            <TextField sx={{padding: '10pt'}} value={name} type="text" label="Name" onChange={({target}) => setName(target.value)}></TextField>
            <TextField sx={{padding: '10pt'}} value={email} type="email" label="Email" onChange={({target}) => setEmail(target.value)}></TextField>
            <TextField sx={{padding: '10pt'}} value={phone} label="Phone" onChange={({target}) => setPhone(target.value)}></TextField>
            <TextField sx={{padding: '10pt'}} value={address} type="text" label="Address" onChange={({target}) => setAddress(target.value)}></TextField>
            <CaptchaTest sx={{padding: '10pt'}}/>
            <Checkout user={user}/>
            <Button type="submit">Submit</Button>
        </FormControl>
        <div>
            <OrderedFoodList></OrderedFoodList>
            <Typography variant="h6" component="div">Total: {sum(order)}</Typography>
        </div>
        
    </Box>)
}

export default Cart