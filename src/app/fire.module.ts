import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';

@NgModule({
  imports: [AngularFireModule.initializeApp(environment.firebaseConfig), AngularFirestoreModule],
})
export class FireModule {}
