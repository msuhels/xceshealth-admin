import React, { useEffect, useState } from "react";
import { PaymentRequestButtonElement, useStripe } from "@stripe/react-stripe-js";

const GooglePayButton = () => {
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState(null);

  useEffect(() => {
    if (!stripe) return;

    const pr = stripe.paymentRequest({
      country: "US", // or "IN" if preferred
      currency: "usd",
      total: {
        label: "Total",
        amount: 1000, // $10
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    pr.canMakePayment().then((result) => {
      console.log("canMakePayment result:", result);
      if (result) {
        setPaymentRequest(pr);
      }
    });
  }, [stripe]);

  if (!paymentRequest) return <p>Google Pay not available on this device.</p>;

  paymentRequest.on("paymentmethod", async (ev) => {
    const res = await fetch("http://localhost:5000/api/user/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 1000, currency: "usd" }),
    });

    const { clientSecret } = await res.json();

    const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: ev.paymentMethod.id,
    }, { handleActions: false });

    if (confirmError) {
      ev.complete("fail");
    } else {
      ev.complete("success");
      alert("Payment successful!");
    }
  });

  return (
    <div style={{ marginTop: 20 }}>
      <PaymentRequestButtonElement options={{ paymentRequest }} />
    </div>
  );
};

export default GooglePayButton;
