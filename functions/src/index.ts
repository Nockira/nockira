var Paypack = require("paypack-js");
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

Paypack.config({
  client_id: "ba17c34a-4b13-11ed-b8d5-dead0b5d6103",
  client_secret:
    "87bd9f197ca70b23d30b6f58cf2fafa1da39a3ee5e6b4b0d3255bfef95601890afd80709",
});

exports.makeSubscriptionPayment = functions.https.onCall(
  async (data, context) => {
    if (context.auth && data.plan && data.phone) {
      

      throw new functions.https.HttpsError(
        e.message,
        "The function must be called " + "while authenticated."
      );
    } else {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    }
  }
);

exports.paymentWebhook = functions.https.onRequest(
  async (req: any, res: any) => {
    const refId = req.body.ref;

    if (refId) {
      const batch = admin.firestore().batch();
      const payment: any = await admin
        .firestore()
        .collectionGroup("payments")
        .where("transactionRef", "==", refId)
        .limit(1)
        .get()
        .then((e) => {
          if (e.empty) {
            return res.status(400).json({ message: "payment not found" });
          } else {
            return {
              ...e.docs[0].data(),
              id: e.docs[0].id,
            };
          }
        });

      if (payment.id) {
        const getEndDate = (plan: any) => {
          const d = new Date();
          return plan === "weekly"
            ? new Date(d.setDate(d.getDate() + 7))
            : plan === "monthly"
            ? new Date(d.setMonth(d.getMonth() + 1))
            : plan === "2-month"
            ? new Date(d.setDate(d.getDate() + 60))
            : new Date();
        };

        batch.set(admin.firestore().doc(`/subscriptions/${payment.user.id}`), {
          start: admin.firestore.Timestamp.fromDate(new Date()),
          end: admin.firestore.Timestamp.fromDate(getEndDate(payment.plan)),
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          status: "active",
          plan: payment.plan,
          user: {
            id: payment.user.id,
            phone: payment.user.phone_number,
            names: payment.user.names,
          },
          payment: {
            method: payment.method,
            id: payment.id,
            amount: payment.amount,
          },
        });
        batch.update(
          admin
            .firestore()
            .doc(`/subscriptions/${payment.user.id}/payments/${payment.id}`),
          {
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            status: "paid",
          }
        );

        await batch.commit();
        return res.json({ massage: "success" });
      } else {
        return res.status(400).json({ message: "payment not found" });
      }
    } else {
      return res.status(400).json({ message: "refid is required" });
    }
  }
);

exports.onSubscriptionUpdated = functions.firestore
  .document("subscriptions/{subscriptionId}")
  .onUpdate(async (change: any, context: any) => {
    const newValue = change.after.data();
    const prevValue = change.before.data();

    const subscription: any = {};

    if (newValue["status"] !== prevValue["status"]) {
      if (newValue["status"] === "active") {
        subscription["status"] = "active";
        subscription["expire"] = new Date(
          newValue["end"].toDate()
        ).toLocaleDateString();
      } else if (newValue["status"] === "expired") {
        subscription["status"] = "expired";
      } else {
        subscription["status"] = newValue["status"];
      }
      return admin
        .auth()
        .getUser(context.params.subscriptionId)
        .then(({ customClaims: oldClaims }) =>
          admin.auth().setCustomUserClaims(context.params.subscriptionId, {
            ...oldClaims,
            subscription: subscription,
          })
        );
    } else {
      return;
    }
  });

exports.MakeAdmin = functions.https.onRequest(async (request, response) => {
  try {
    await admin
      .auth()
      .getUser(request.body.id)
      .then(({ customClaims: oldClaims }) =>
        admin.auth().setCustomUserClaims(request.body.id, {
          ...oldClaims,
          role: "admin",
        })
      );
    response.status(200).json("customtoken");
  } catch (err: any) {
    response.status(400).send(err.message);
  }
});
