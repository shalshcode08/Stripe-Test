import { useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

export const StripeWallets = () => {
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchClientSecret = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/secret", {
        method: "GET",
      });
      const { clientSecret } = await response.json();
      console.log(clientSecret); //->log
      return { clientSecret };
    } catch (error) {
      setLoading(false);
      console.error("Error fetching client secret:", error);
      throw error;
    }
  };

  const handleWalletClick = async () => {
    if (!stripe) {
      console.error("Stripe not loaded");
      return;
    }

    try {
      setLoading(true);
      const { clientSecret } = await fetchClientSecret();

      const { error } = await stripe.confirmAlipayPayment(clientSecret, {
        return_url: `${window.location.origin}/success`,
      });

      console.log(error);//->log
      
      if (error) {
        setLoading(false);
        console.error("Payment confirmation failed:", error);
      }
    } catch (err) {
      console.error("Error during payment:", err);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="p-2 border border-orange-600 rounded hover:bg-orange-100 hover:border-orange-300 cursor-pointer flex flex-row items-center px-4 justify-center gap-2 text-center"
        onClick={handleWalletClick}
      >
        {loading ? (
          <div className="text-sm text-orange-600">Loading...</div>
        ) : (
          <>
            <div>💵</div>
            <p className="text-sm text-orange-600">Ali Pay</p>
          </>
        )}
      </div>
    </div>
  );
};
