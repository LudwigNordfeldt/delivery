import { useState, useEffect } from "react"
import { useStore } from "react-redux";

import FoodList from "../components/foodList";
import RestaurantList from "../components/restaurantList";
import FoodService from "../services/food"
import RestaurantService from "../services/restaurant"

const Shop = () => {
  const store = useStore().getState()
  console.log(store)
  const [restaurants, setRestaurants] = useState(null)
  const [foods, setFoods] = useState(null)
  const [restName, setRestName] = useState(null)

  useEffect(() => {
    const getStuff = async () => {
      let resFood = await FoodService.getFood()
      let resRest = await RestaurantService.getRest()

      if (store.restaurant) {
        let rest = resRest.find(el => el.id === store.restaurant).name
        setRestName(rest)
        resFood = resFood.filter(el => el.restaurant.toString() === store.restaurant)
      }

      setFoods(resFood)
      setRestaurants(resRest)
    }

    getStuff()
  }, [store.restaurant] )

  return (
    <div className="shop">
      <div>
        {restaurants ? <RestaurantList restaurants={restaurants}></RestaurantList> : <></>}
      </div>
      <div>
        <h3>Chosen restaurant: {restName ? restName : 'None'}</h3>
        {foods ? <FoodList foods={foods}></FoodList> : <></>}
      </div>
    </div>
  );
};

export default Shop;
