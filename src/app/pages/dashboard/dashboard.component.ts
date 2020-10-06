import { trigger, transition, style, animate } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'fe-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [style({ opacity: 0 }), animate('0.5s ease-out', style({ opacity: 1 }))]),
      transition(':leave', [style({ opacity: 1 }), animate('0.5s ease-in', style({ opacity: 0 }))])
    ])
  ]
})
export class DashboardComponent implements OnInit {
  public users$: Observable<any> = this.db.collection('users').valueChanges();
  public showUserModal: boolean = false;
  public users: any;
  public selectedUser;

  @ViewChild('therapist') therapistInput: ElementRef;
  @ViewChild('currentUser') userInput: ElementRef;

  constructor(
    private messageSvc: MessageService,
    private cd: ChangeDetectorRef,
    private authSvc: AuthService,
    private db: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.users$.subscribe((users) => {
      this.users = users;
    });
  }

  onUserSelected(user) {
    this.selectedUser = null;
    setTimeout(() => {
      this.selectedUser = user;
      this.cd.detectChanges();
    }, 500);
  }

  onModalCancel() {
    this.showUserModal = false;
  }

  onNewUserCreate(user) {
    this.authSvc.createUser({ name: user.name }).subscribe((x) => {
      this.onUserSelected({ name: user.name });
    });
  }

  onTherapistTextSend() {
    this.therapistInput.nativeElement.value = '';
    console.log(this.therapistInput.nativeElement.value);
  }

  oncurrentUserTextSend() {
    console.log(this.userInput.nativeElement.value, this.selectedUser);
    const message = this.userInput.nativeElement.value;
    this.messageSvc.createMessage(this.selectedUser, message);
    this.userInput.nativeElement.value = '';
  }
}
