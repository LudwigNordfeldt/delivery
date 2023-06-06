import { useDispatch, useSelector } from "react-redux"
import { removeOrder, addOrder, substractOrder } from "../reducer"
import { forsake } from "../chosenRestaurantReducer"

const OrderedFood = (props) => {
    const order = useSelector(state => state.order)
    const dispatch = useDispatch()

    const remove = (name) => event => {
        if (order.length === 1) {
            dispatch(forsake())
        }
        dispatch(removeOrder(name))
    }

    const add = (name) => event => {
        dispatch(addOrder(name))
    }

    const substract = (name) => event => {
        dispatch(substractOrder(name))
    }

    return(
        <div>
            <p>{props.food.name}</p>
            <p>{props.food.cost}</p>
            <p>{props.food.number}</p>
            <img src={props.food.pic} alt="" width="100pt" height="100pt"></img>
            <div>
                <button onClick={substract(props.food.name)}>-</button>
                <button onClick={add(props.food.name)}>+</button>
            </div>
            <button onClick={remove(props.food.name)}>Remove</button>
        </div>
    )
}

export default OrderedFood