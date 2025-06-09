import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const { payment_method } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 999,
    currency: "usd",
    payment_method,
    confirmation_method: "manual",
    confirm: true,
  });

  res.send({ client_secret: paymentIntent.client_secret });
});

app.listen(process.env.PORT, () =>
  console.log("Server running on ", process.env.PORT)
);
