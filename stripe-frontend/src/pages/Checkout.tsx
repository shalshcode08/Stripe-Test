import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { StripeWallets } from "../components/StripeWallets";

export const Checkout = () => {
  const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  if (!key) {
    throw new Error("Missing Stripe publishable key");
  }
  const stripePromise = loadStripe(key);

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <Elements stripe={stripePromise}>
            <StripeWallets />
        </Elements>
      </div>
    </div>
  );
};
