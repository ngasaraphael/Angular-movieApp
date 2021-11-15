// import { Component, Input } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { FetchApiDataService } from '../fetch-api-data.service';

// @Component({
//   selector: 'app-login-form',
//   templateUrl: './login-form.component.html',
//   styleUrls: ['./login-form.component.scss'],
// })
// export class LoginFormComponent {
//   @Input() userData = { username: '', password: '' };

//   constructor(
//     public fetchApiData: FetchApiDataService,
//     public dialogRef: MatDialogRef<LoginFormComponent>,
//     public snackBar: MatSnackBar
//   ) {}

//   login(): void {
//     this.fetchApiData.userLogin(this.userData).subscribe(
//       (result) => {
//         this.dialogRef.close();

//         localStorage.setItem('token', result.token);
//         localStorage.setItem('user', JSON.stringify(result.user));

//         let successMessage =
//           'Logged in ' + result.user.Username + '. Loading moves...';
//         this.snackBar.open(successMessage, 'OK', {
//           duration: 4000,
//         });
//       },
//       (result) => {
//         console.log(result);
//         this.snackBar.open(result, 'OK', {
//           duration: 4000,
//         });
//       }
//     );
//   }
// }

import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        this.dialogRef.close();

        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));

        let successMessage = result.user.username + ' ' + 'Logged in';
        this.snackBar.open(successMessage, 'OK', {
          duration: 5000,
        });
      },
      (result) => {
        // console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 5000,
        });
      }
    );
  }
}
