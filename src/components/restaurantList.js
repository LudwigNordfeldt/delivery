import Restaurant from "./restaurant"

const RestaurantList = (props) => {
    //console.log("RESTAURANTS:", props.restaurants)
    return(
    <div className="restaurants">
        {props.restaurants.map(el => (
        <Restaurant name={el.name} pic={el.pic}></Restaurant>
    ))}
    </div>
    )
}

export default RestaurantList