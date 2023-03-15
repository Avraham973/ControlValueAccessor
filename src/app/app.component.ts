import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'control-value-accessor';
  public readonly dateControl = new FormControl(new Date());

  setDisable() {
    this.dateControl.disable();
  }
}
