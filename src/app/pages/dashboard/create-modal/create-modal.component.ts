import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'fe-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss']
})
export class CreateModalComponent implements OnInit {
  public name;

  @Output() onCancel = new EventEmitter();
  @Output() onCreate = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onCreateButtonClick(e: Event) {
    e.stopPropagation();

    if (this.name) {
      this.onCreate.emit({name: this.name});
      this.name = null;
      this.onCancel.emit(true);
    }
  }

  onCancelClick(e: Event) {
    e.stopPropagation();

    this.onCancel.emit(true);
  }
}
