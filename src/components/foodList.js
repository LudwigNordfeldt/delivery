import Food from "./food"

const FoodList = ({foods, setName}) => {
    return(
        <div className="foods" style={{display: 'flex'}}>
        {foods.map(el => (
        <Food food={el} setName={setName} />
    ))}
    </div>
    )
}

export default FoodList