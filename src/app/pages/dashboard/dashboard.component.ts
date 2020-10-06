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
  public history;

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

  onMarkReadButtonClick(e: Event) {
    this.messageSvc.markRead(this.selectedUser);
  }

  onUserSelected(user) {
    this.selectedUser = null;
    this.messageSvc.getUserHistory(user).subscribe((res) => {
      const sortedData = this.sortHistory(res);
      this.history = sortedData;
    });
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
      this.cd.detectChanges();
    });
  }

  onTherapistTextSend() {
    const message = this.therapistInput.nativeElement.value;
    this.messageSvc.createTherapistMessage(this.selectedUser, message);
    this.therapistInput.nativeElement.value = '';
  }

  oncurrentUserTextSend() {
    const message = this.userInput.nativeElement.value;
    this.messageSvc.createUserMessage(this.selectedUser, message);
    this.userInput.nativeElement.value = '';
  }

  private sortHistory(history) {
    if (Array.isArray(history)) {
      return history.slice().sort((a: any, b: any) => {
        return new Date(a.id).valueOf() - new Date(b.id).valueOf();
      });
    }
  }
}
