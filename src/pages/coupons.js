import { useState, useEffect } from "react";
import couponService from "../services/coupons";

const Coupons = () => {
  const [coupons, setCoupons] = useState(null);
  useEffect(() => {
    const getCoupons = async () => {
      const res = await couponService.getCoupons();
      setCoupons(res);
    };

    getCoupons();
  });

  return (
    <div>
      {coupons ? (
        coupons.map((el) => (
          <div>
            <p>{el.name}</p>
            <button value={el.code} onClick={({target}) => navigator.clipboard.writeText(target.value)}>
              {el.code}
            </button>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default Coupons;
