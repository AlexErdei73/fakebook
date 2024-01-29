/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onSchedule } = require("firebase-functions/v2/scheduler");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to delete inactive users.
const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");
initializeApp();

// Run once a day at midnight, to clean up the users
// Manually run the task here https://console.cloud.google.com/cloudscheduler
exports.accountcleanup = onSchedule("every day 00:00", async (event) => {
  try {
    // Fetch all users without email verification
    const uids = [];
    const getAllUsersWithoutValidEmail = async (nextPageToken) => {
      // List batch of users, 1000 at a time.
      const listUsersResult = await getAuth().listUsers(1000, nextPageToken);
      listUsersResult.users.forEach((userRecord) => {
        if (!userRecord.emailVerified) uids.push(userRecord.uid);
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        await getAllUsersWithoutValidEmail(listUsersResult.pageToken);
      }
    };
    // Start listing users from the beginning, 1000 at a time.
    await getAllUsersWithoutValidEmail();
    // Delete the user accounts
    await getAuth().deleteUsers(uids);

    // Delete the documents from the users colection in Firestore
    const bulkWriter = getFirestore().bulkWriter();
    uids.forEach((uid) => {
      const documentRef = getFirestore().doc(`users/${uid}`);
      bulkWriter.delete(documentRef);
    });
    await bulkWriter.flush();

    logger.log("User cleanup finished");
  } catch (error) {
    logger.error(error);
  }
});
