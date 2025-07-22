import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import AppleGooglePayButton from "./AppleGooglePayButton";

const stripePromise = loadStripe("pk_test_51MdqYtEarL95InZuQJBw9LcLgwk22IJCzta2y1iNziXB0lZgoIDnCGcO2KUlJ5qwy6lSUlhJBxJ3aeCUDY9aqpK600vehzInnq");

const StripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="w-[400px]">
        {/* <CheckoutForm /> */}
        <hr />
        <AppleGooglePayButton/>
      </div>
    </Elements>
  );
};

export default StripeContainer;
