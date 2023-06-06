import OrderedFood from "./orderedFood"
import { useSelector } from "react-redux"

const OrderedFoodList = () => {
    const foods = useSelector(state => state.order)
    return(
        <div className="foods">
        {foods.map(el => (
        <OrderedFood food={el} />
    ))}
    </div>
    )
}

export default OrderedFoodList