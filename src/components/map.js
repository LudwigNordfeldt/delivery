import { ReactBingmaps } from "react-bingmaps";
import { useState } from "react";
import RestaurantService from "../services/restaurant";

const Map = () => {
  const bingmapKey =
    "ArrQ_Cu3ZmkEku6CYm1MeN4axaZGHUTfU2h3URdHRb-OHuiEN4Fje9mViq1OHJyS";

  const [getLocationHandledData, setData] = useState("");
  const [pushPins, setPushPins] = useState([]);
  const [nearbyCafe, setNearbyCafe] = useState(null)

  const handleClick = async (location) => {
    const Coords = [
      {
        location: [location.latitude, location.longitude],
        option: { color: "yellow" },
        addHandler: { type: "click", callback: PushClick },
      },
    ];

    setData(`Latitude: ${location.latitude}; Longitude: ${location.longitude}`);
    setPushPins(Coords);

    getLocation(location.latitude, location.longitude)
  };

  const PushClick = () => {};

  const getLocation = async (lat, long) => {
    const res = await RestaurantService.getLoc(lat, long)
    if (res.resourceSets[0].resources) {
        setNearbyCafe(res.resourceSets[0].resources[0])
    } else {
        setNearbyCafe("None")
    }
  };

  return (
    <div>
      <div className="map-one">
        <u>
          Bingmaps with Get Location - <span>{getLocationHandledData}</span>
        </u>
        <ReactBingmaps
          id="seven"
          className="customClass"
          center={[40.685827, -73.98724]}
          bingmapKey={bingmapKey}
          getLocation={{
            addHandler: "click",
            callback: handleClick,
          }}
          pushPins={pushPins}
        />
      </div>
      <p>{nearbyCafe ? (nearbyCafe === "None" ? 'No restaurants found nearby' : nearbyCafe.Address.addressLine) : ''}</p>
    </div>
  );
};

export default Map;
