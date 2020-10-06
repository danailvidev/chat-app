import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({ providedIn: 'root' })
export class MessageService {
  constructor(private db: AngularFirestore) {}

  createMessage(user: any, message: string) {
    const now = new Date();
    const formatedDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const formatedTime = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}.${now.getMilliseconds()}`;

    this.db
      .collection(`users`)
      .doc(`${user.uid}`)
      .update({ user_msg: firebase.firestore.FieldValue.serverTimestamp() });

    this.db
      .collection(`users/${user.uid}/messages`)
      .doc(`${formatedDate}`)
      .set(
        {
          [formatedTime]: {
            source: user.name,
            sourceId: user.uid,
            text: message
          }
        },
        { merge: true }
      );
  }
}
