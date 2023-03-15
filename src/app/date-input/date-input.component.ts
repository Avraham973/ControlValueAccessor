import { Component, forwardRef, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true,
    },
  ],
})
export class DateInputComponent implements ControlValueAccessor, OnInit {
  public readonly dayControl = new FormControl();
  public readonly monthControl = new FormControl();
  public readonly yearControl = new FormControl();

  ngOnInit(): void {
    console.log('ngOnInit');
    combineLatest([
      this.dayControl.valueChanges,
      this.monthControl.valueChanges,
      this.yearControl.valueChanges,
    ]).subscribe(([day, month, year]) => {
      const fieldsAreValid =
        this.dayControl.valid &&
        this.monthControl.valid &&
        this.yearControl.valid;

      const value = fieldsAreValid ? new Date(day, month - 1, year) : null;
      this._onChange(value);
      this.onTouched();
    });
  }

  writeValue(value: Date | null): void {
    console.log('writeValue');
    value = value ?? new Date();

    const day = value.getDate();
    const month = value.getMonth() + 1;
    const year = value.getFullYear();

    this.dayControl.setValue(day);
    this.monthControl.setValue(month);
    this.yearControl.setValue(year);
  }

  private _onChange = (_value: Date | null): void => undefined;
  public registerOnChange(fn: (value: Date | null) => void): void {
    console.log('registerOnChange');
    this._onChange = fn;
  }

  public onTouched = (): void => undefined;
  registerOnTouched(fn: () => any): void {
    console.log('registerOnTouched');
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    console.log('setDisabledState');
    if (isDisabled) {
      this.dayControl.disable();
      this.monthControl.disable();
      this.yearControl.disable();
    } else {
      this.dayControl.enable();
      this.monthControl.enable();
      this.yearControl.enable();
    }
  }
}
