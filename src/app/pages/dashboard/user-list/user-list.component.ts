import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'fe-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public show = false;
  public selectedUser;
  public isHighlight = false;

  @Input() public users: any;
  @Output() onSelect = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.users && !changes.firstChange && changes.users.previousValue && changes.users.currentValue) {
      const distinct = changes.users.currentValue.filter(
        (o) => !changes.users.previousValue.find((o2) => o.uid === o2.uid)
      );
      if (distinct && distinct.length && distinct.length > 0) {
        this.onUserSelect(distinct[0]);
      }
    }
  }

  onUserSelect(user) {
    if (user) {
      this.selectedUser = user;
      this.show = false;
      this.onSelect.emit(user);
    }
  }
}
