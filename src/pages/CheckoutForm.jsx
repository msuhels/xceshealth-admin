import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/user/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: 1000, currency: "inr" }),
        }).then(res => res.json()).then(data => {
            console.log("Client secret from backend:", data.clientSecret);
            setClientSecret(data.clientSecret)
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (result.error) {
            alert(result.error.message);
        } else {
            if (result.paymentIntent.status === "succeeded") {
                alert("Payment Successful!");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button disabled={!stripe}>Pay</button>
        </form>
    );
};

export default CheckoutForm;
