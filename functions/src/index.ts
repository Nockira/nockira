var Paypack = require("paypack-js");
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

Paypack.config({
  client_id: "3928e56e-448f-11ed-83ef-dead0b5d6103",
  client_secret:
    "2f967bb5017b58461743bf23525ba160da39a3ee5e6b4b0d3255bfef95601890afd80709",
});

exports.makeSubscriptionPayment = functions.https.onCall((data, context) => {
  if (context.auth && data.plan && data.phone) {
    const getAmount = (plan: any) => {
      return plan === "weekly"
        ? 2000
        : plan === "monthly"
        ? 5000
        : plan === "2-month"
        ? 10000
        : 0;
    };
    const user = context.auth;

    // return Paypack.cashin({
    //   number: data.phone,
    //   amount: getAmount(data.plan),
    // }).then((e: any) => {
    return admin
      .firestore()
      .collection("subscriptions")
      .doc(user.uid)
      .collection("payments")
      .add({
        method: data.method,
        amount: getAmount(data.plan),
        transactionId: "dcbhdcbdhc",
        status: "pending",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        user: {
          id: user.uid,
          phone: user.token.phone_number,
          photo: user?.token.picture || "",
        },
      })
      .then((doc) => {
        return {
          paymentId: doc.id,
        };
      });
    // });
  } else {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called " + "while authenticated."
    );
  }
});
