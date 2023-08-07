import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../reducer'
import { choose } from '../chosenRestaurantReducer'

import { useState } from 'react'

const Food = ({food, setName}) => {
    const [not, setNot] = useState('')
    const dispatch = useDispatch()
    const order = useSelector(state => state.order)

    const handleClick = (name, cost, pic, rest) => async event => {
        if (order.find (el => el.name === name)) {
            setNot('Item already in the cart')
            setTimeout(() => {
                setNot('')
            }, 5000)
            return
        }

        if(order.length === 0) {
            dispatch(choose({rest}))
            setName(rest)
        }

        dispatch(createOrder({name, cost, pic, number: 1}))
    }

    return(
        <div>
            <p>{food.name}</p>
            <p>{food.cost}</p>
            <img src={food.pic} alt="" height='50pt' width='50pt'></img>
            <button onClick={handleClick(food.name, food.cost, food.pic, food.restaurant)}>Add to Cart</button>
            <p>{not}</p>
        </div>
    )
}

export default Food