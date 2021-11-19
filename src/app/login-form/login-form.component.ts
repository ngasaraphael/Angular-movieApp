import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Input() userData = { username: '', password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (res) => {
        this.dialogRef.close();

        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));

        // localStorage.setItem('user', res.user.Username);
        // localStorage.setItem('token', res.token);

        let successMessage = res.user.username + ' ' + 'Logged in';

        this.snackBar.open(successMessage, 'OK', {
          duration: 5000,
        });
        this.router.navigate(['movies']);
      },
      (res) => {
        this.snackBar.open(
          res,
          'Wrong username or password. Please try again',
          {
            duration: 5000,
          }
        );
      }
    );
  }
}
