import Food from "./food"

const FoodList = props => {
    return(
        <div className="foods" style={{display: 'flex'}}>
        {props.foods.map(el => (
        <Food food={el}/>
    ))}
    </div>
    )
}

export default FoodList