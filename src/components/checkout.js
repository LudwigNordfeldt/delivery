import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";

import UserService from "../services/users"

import { sum } from "../pages/cart";

const style = {"layout":"vertical"};

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner, amount, user }) => {
    const order = useSelector(state => state.order)
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


    return (<>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(async function () {
                        const usersFound = await UserService.getAll()
                        const userFound = usersFound.find((el) => el.username === user.username)
                        
                        const userID = { user: userFound.id }

                        console.log("Payment succeeded")
                        let now = new Date()
                        await UserService.addOrder(order, sum(order), now, userID)

                    });
                }}
            />
        </>
    );
}

export default function Checkout({user}) {
    const order = useSelector(state => state.order)
    // This values are the props in the UI
    const amount = sum(order).toString();
    const currency = "USD";
	return (
		<div style={{ maxWidth: "750px", minHeight: "200px" }}>
            <PayPalScriptProvider
                options={{
                    "client-id": "test",
                    components: "buttons",
                    currency: "USD"
                }}
            >
				<ButtonWrapper
                    currency={currency}
                    showSpinner={false}
                    amount={amount}
                    user={user}
                />
			</PayPalScriptProvider>
		</div>
	);
}