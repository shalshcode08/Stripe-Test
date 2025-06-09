import {
  PaymentRequestButtonElement,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

export const StripeWallets = () => {
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] =
    useState<stripe.PaymentRequest | null>(null);

  useEffect(() => {
    if (!stripe) return;

    const pr = stripe.paymentRequest({
      country: "US",
      currency: "usd",
      total: {
        label: "Demo Total",
        amount: 999,
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    pr.canMakePayment().then((result) => {
      if (result) setPaymentRequest(pr);
    });

    pr.on("paymentmethod", async (ev) => {
      try {
        const response = await fetch(
          "http://localhost:3000/create-payment-intent",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ payment_method: ev.paymentMethod.id }),
          }
        );

        const { client_secret } = await response.json();

        const confirmResult = await stripe.confirmCardPayment(client_secret, {
          payment_method: ev.paymentMethod.id,
        });

        if (confirmResult.error) {
          ev.complete("fail");
          alert("Payment failed: " + confirmResult.error.message);
        } else {
          ev.complete("success");
          window.location.href = "/success";
        }
      } catch (error) {
        ev.complete("fail");
        alert("Error: " + error);
      }
    });
  }, [stripe]);

  if (!paymentRequest)
    return (
      <p className="text-center text-gray-800 underline">
        No wallet payment methods available
      </p>
    );

  return (
    <div className="w-[300px]">
      <PaymentRequestButtonElement options={{ paymentRequest }} />
    </div>
  );
};
