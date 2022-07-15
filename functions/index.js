const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51LJfE8SIni12pfgXO0qz6c5U49qDL0ytRr05OyNOxwGGFd2ZR5xoFIhTP1SGV5rBU4FonIg2Hfvc0Sui7IXt80E100IJ2zDDmD"
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes

app.post("/payments/create", async (request, response) => {
  response.header("Access-Control-Allow-Origin", request.header("Origin"));
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/challenge-4b2b2/us-central1/api
// http://localhost:5001/fir-dd55f/us-central1/api
