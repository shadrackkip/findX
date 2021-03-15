import { CustomvalidationService } from './../../services/customvalidation.service';
import { AppStateService } from './../../services/app-state.service';
import { User } from './../../models/user.model';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  errorFields: string[] = [];
  errorValidateObject: any = {};

  submitted = false;

  constructor(
    private authService: AuthService,
    private appService: AppStateService,
    private customValidator: CustomvalidationService,
    private fb: FormBuilder
  ) {}
  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      Validators.compose([
        Validators.required,
        this.customValidator.patternValidator(),
      ]),
    ],
    password_confirmation: ['', Validators.required],
  });

  register = () => {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.appService.setAppIsLoading({ isLoading: true });
      let user = this.registerForm.value;
      this.authService.register(user).subscribe((resp: User) => {
        if (resp.success) {
          let notifyData = {
            show: true,
            statusClass: 'success',
            message: resp.message,
          };
          this.appService.appStatusNotification(notifyData);
        } else {
          let keysArr = Object.keys(resp.data);

          keysArr.forEach((key) => {
            this.errorFields.push(key);
          });
          this.errorValidateObject = resp.data;
          let notifyData = {
            show: true,
            statusClass: 'danger',
            message: resp.message,
          };
          this.appService.appStatusNotification(notifyData);
        }
        this.appService.setAppIsLoading({ isLoading: false });
      });
    }
  };

  get registerFormControl() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    this.registerForm.valueChanges.subscribe((field) => {
      const keys = Object.keys(field);
      keys.forEach((key) => {
        if (field[key] !== '') {
          if (this.errorFields.length > 0) {
            if (this.errorFields.includes(key)) {
              let i = this.errorFields.indexOf(key);
              this.errorFields.splice(i, 1);
            }
          }
        } else {
          console.log(this.errorFields);
          if (this.errorFields.length > 0) {
            if (!this.errorFields.includes(key)) {
              this.errorFields.push(key);
            }
          }
        }
      });
    });
  }

  //validations
  validatePassword = () => {};
}
