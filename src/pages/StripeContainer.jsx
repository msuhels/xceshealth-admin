import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import GooglePayButton from "./AppleGooglePayButton"; // renamed
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

// Stripe publishable key
const stripePromise = loadStripe("pk_test_51MdqYtEarL95InZuQJBw9LcLgwk22IJCzta2y1iNziXB0lZgoIDnCGcO2KUlJ5qwy6lSUlhJBxJ3aeCUDY9aqpK600vehzInnq");

const StripeContainer = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Page Content */}
        <main className="flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-6">
            <h1 className="text-2xl font-bold text-center text-gray-800">
              Secure Checkout
            </h1>
            <p className="text-center text-gray-500">
              Pay using Apple Pay, Google Pay, or Card
            </p>

            <Elements stripe={stripePromise}>
              <div className="space-y-6">
                {/* Apple/Google Pay Button */}
                <GooglePayButton />

                {/* OR separator */}
                <div className="relative text-center text-gray-400">
                  <span className="absolute inset-x-0 top-1/2 border-t border-gray-300" />
                  <span className="bg-white px-3 relative z-10">or</span>
                </div>

                {/* Card payment form */}
                <CheckoutForm />
              </div>
            </Elements>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StripeContainer;
