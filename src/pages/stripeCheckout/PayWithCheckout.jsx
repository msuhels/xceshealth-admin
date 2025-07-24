// CheckoutWithExpress.jsx
import React, { useEffect, useState } from "react";
import { ExpressCheckoutElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { axiosClient } from "../../utils/axiosClient";
import { CREATE_STRIPE_PAYMENT } from "../../api/apiUrl";
const CheckoutWithExpress = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
      const createPaymentIntent = async () => {
        try {
          const { data } = await axiosClient.post( CREATE_STRIPE_PAYMENT, {
            amount: 100,
            currency: "usd",
          });
          setClientSecret(data.clientSecret);
        } catch (error) {
          console.error("Error creating PaymentIntent:", error);
        }
      };
  
      createPaymentIntent();
    }, []);

    const handleClick = async () => {
        if (!stripe || !elements || !clientSecret) return;

        const result = await stripe.confirmExpressCheckoutPayment(clientSecret, {
        elements,
        confirmParams: {
            return_url: "http://localhost:3000/success",
        },
        });

        if (result.error) {
        console.error(result.error.message);
        }
    };

  return (
    <>
    <div style={{ marginTop: 20 }}>
      <h3 className="text-lg font-bold mb-2">Express Checkout</h3>
      <ExpressCheckoutElement onConfirm={handleClick} />
    </div>
    </>
  );
};

export default CheckoutWithExpress;
