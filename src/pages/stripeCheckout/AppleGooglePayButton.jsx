import React, { useEffect, useState } from 'react';
import { PaymentRequestButtonElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CREATE_STRIPE_PAYMENT } from '../../api/apiUrl';
import { axiosClient } from '../../utils/axiosClient';

const GooglePay = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!stripe || !elements) return;

    const pr = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Demo total',
        amount: 1999, // $19.99
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    pr.canMakePayment().then(result => {
      if (result) {
        setPaymentRequest(pr);
      } else {
        setMessage('Google Pay is not available on this browser.');
      }
    });

    pr.on('paymentmethod', async (e) => {
      try {
        const { data } = await axiosClient.post( CREATE_STRIPE_PAYMENT, {
          amount: 100,
          currency: "usd",
        });

        if (data.error) {
          setMessage(`Backend error: ${data.error.message}`);
          return;
        }

        const { clientSecret } = data;

        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: e.paymentMethod.id,
        }, { handleActions: false });

        if (stripeError) {
          setMessage(`Stripe error: ${stripeError.message}`);
          e.complete('fail');
        } else {
          setMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
          e.complete('success');
        }
      } catch (err) {
        setMessage(`Axios error: ${err.message}`);
        e.complete('fail');
      }
    });
  }, [stripe, elements]);

  return (
    <div>
      <h2>Google Pay via Stripe</h2>
      {paymentRequest ? (
        <PaymentRequestButtonElement options={{ paymentRequest }} />
      ) : (
        <p>{message || 'Loading Google Pay button...'}</p>
      )}
    </div>
  );
};

export default GooglePay;
