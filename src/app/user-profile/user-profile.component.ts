import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  //get User info from local storage
  getUserInfo(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.user;
  }

  //Opens editProfile Modal
  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: '300px',
    });
  }

  //rout to movies
  login(): void {
    this.router.navigate(['movies']);
  }

  //Delete user profile
  deleteUser(): void {
    this.fetchApiData.deleteUser(this.user.username).subscribe(
      () => {
        this.snackBar.open(
          `The user ${this.user.username} has been deregistered`,
          'Great',
          {
            duration: 2000,
          }
        );
        this.router.navigate(['welcome']);
        localStorage.clear();
      },
      (result) => {
        this.snackBar.open('Something went wrong, please try later. 😿', 'Ok', {
          duration: 2000,
        });
      }
    );
  }
}
