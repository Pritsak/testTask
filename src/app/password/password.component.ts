import { Component, OnInit, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true
    }
  ]
})
export class PasswordComponent implements OnInit, ControlValueAccessor {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initPasswordForm()
  }

  public strength = 'empty';

  public firstSectionColor = 'gray'
  public secondSectionColor = 'gray'
  public thirdSectionColor = 'gray'

  public passwordStrength!: FormGroup

  initPasswordForm(): void {
    this.passwordStrength = this.fb.group({
      password: [null]
    })
  }

  calculateStrength(): "easy" | "medium" | "strong" | "unvalid" | "empty" {
    const password = this.passwordStrength.value.password;

    if (!password) {
      return "empty"
    } else if (password.length < 8) {
      return 'unvalid'
    }
    let hasLetters = false
    let hasDigits = false
    let hasSymbols = false

    for (let i = 0; i < password.length; i++) {
      let charCode = password.charCodeAt(i);
      if (charCode >= 48 && charCode <= 57) {
        hasDigits = true
      } else if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
        hasLetters = true
      } else {
        hasSymbols = true
      }
    }

    let strength = "easy"
    if (hasLetters && hasDigits && hasSymbols) {
      strength = "strong"
    } else if (hasLetters && hasDigits || hasLetters && hasSymbols || hasDigits && hasSymbols) {
      strength = "medium"
    }
    return strength as "easy" | "medium" | "strong" | "unvalid" | "empty"
  }

  onChange = (_: any) => {}

  onTouched = () => {}

  writeValue(obj: any): void {
    if (obj !== undefined) {
      this.passwordStrength.setValue({ password: obj })
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
   this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.passwordStrength.disable() : this.passwordStrength.enable()
  }

  onChangee(): void {
    const strength = this.calculateStrength()

    switch (strength) {
      case 'unvalid':
        this.firstSectionColor = 'red'
        this.secondSectionColor = 'red'
        this.thirdSectionColor = 'red'
        break;
      case "empty":
        this.firstSectionColor = 'gray'
        this.secondSectionColor = 'gray'
        this.thirdSectionColor = 'gray'
        break;
      case "easy":
        this.firstSectionColor = 'red'
        this.secondSectionColor = 'gray'
        this.thirdSectionColor = 'gray'
        break;
      case "medium":
        this.firstSectionColor = 'yellow'
        this.secondSectionColor = 'yellow'
        this.thirdSectionColor = 'gray'
        break;
      case "strong":
        this.firstSectionColor = 'green'
        this.secondSectionColor = 'green'
        this.thirdSectionColor = 'green'
        break;
    }
  }
}
