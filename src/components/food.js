import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../reducer'
import { choose } from '../chosenRestaurantReducer'

import { useReducer } from 'react'

import { useState } from 'react'

const Food = props => {
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

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
            forceUpdate()
        }

        dispatch(createOrder({name, cost, pic, number: 1}))
    }

    return(
        <div>
            <p>{props.food.name}</p>
            <p>{props.food.cost}</p>
            <img src={props.food.pic} alt="" height='50pt' width='50pt'></img>
            <button onClick={handleClick(props.food.name, props.food.cost, props.food.pic, props.food.restaurant)}>Add to Cart</button>
            <p>{not}</p>
        </div>
    )
}

export default Food