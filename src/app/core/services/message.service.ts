import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
  constructor(private db: AngularFirestore) {}

  getUserHistory(user: any): Observable<any> {
    const ref = this.db.collection<any>(`users/${user.uid}/messages`);
    return ref.valueChanges({ idField: 'id' });
  }

  markRead(targetUser: any) {
    let userRef = this.db.collection(`users`).doc(`${targetUser.uid}`);
    userRef.get().subscribe((res) => {
      if (res) {
        let data = res.data();
        if (data.user_msg && data.therapist_msg) {
          data.user_msg.toMillis() > data.therapist_msg.toMillis()
            ? userRef.update({
                therapist_msg: data.user_msg
              })
            : userRef.update({
                user_msg: data.therapist_msg
              });
        }
      }
    });
  }

  createTherapistMessage(targetUser: any, message: string) {
    const now = new Date();
    const formatedDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const formatedTime = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}.${now.getMilliseconds()}`;

    const userRef = this.db.collection(`users`).doc(`${targetUser.uid}`);
    userRef.update({ therapist_msg: firebase.firestore.FieldValue.serverTimestamp() });

    this.db
      .collection(`users/${targetUser.uid}/messages`)
      .doc(`${formatedDate}`)
      .set(
        {
          [formatedTime]: {
            source: 'therapist',
            sourceId: 'therapist',
            text: message
          }
        },
        { merge: true }
      );
  }

  createUserMessage(user: any, message: string) {
    const now = new Date();
    const formatedDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const formatedTime = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}.${now.getMilliseconds()}`;

    const userRef = this.db.collection(`users`).doc(`${user.uid}`);
    userRef.update({ user_msg: firebase.firestore.FieldValue.serverTimestamp() });

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
