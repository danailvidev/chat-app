import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { UserRecord } from 'firebase-functions/lib/providers/auth';

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.createUser = functions.https.onRequest(async (request: any, response: any) => {
  if (request.method !== 'POST') {
    response.status(405).send('Method Not Allowed');
  } else {
    const body = request.body;
    const name = body.name;

    admin
      .auth()
      .createUser({
        displayName: name,
        disabled: false
      })
      .then((userRecord: UserRecord) => {
        return response.status(200).send('Successfully created new user: ' + userRecord.uid);
      })
      .catch((error: any) => {
        return response.status(400).send('Failed to create user: ' + error);
      });
  }
});

exports.createProfile = functions.auth.user().onCreate((user: UserRecord) => {
  const userObject = {
    name: user.displayName
  };

  return admin.firestore().doc(`users/${user.uid}`).set(userObject);
});
