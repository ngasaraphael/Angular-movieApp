import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  //open signupModal
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Giving modal a with
      width: '300px',
    });
  }
  //open loginpModal
  openUserLoginDialog(): void {
    this.dialog.open(LoginFormComponent, {
      // Giving modal a with
      width: '300px',
    });
  }
}
