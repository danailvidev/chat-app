import { Component } from '@angular/core';

@Component({
  selector: 'fe-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent {
  menuState = false;
  emergencyNumber = null;

  changeMenuState() {
    this.menuState = !this.menuState;
  }
}
