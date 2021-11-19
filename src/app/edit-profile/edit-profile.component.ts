import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user') || '');

  @Input() userData = {
    username: this.user.username,
    password: '',
    email: this.user.email,
    birthday: this.user.birthday,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { onSuccess: () => void },
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  updateUser(): void {
    this.fetchApiData.updateUser(this.user.username, this.userData).subscribe(
      (res) => {
        this.dialogRef.close();

        localStorage.setItem('user', JSON.stringify(res));
        this.snackBar.open('Successfully updated user details!', 'OK', {
          duration: 4000,
        });
      },
      (res) => {
        this.snackBar.open(res, 'OK', {
          duration: 4000,
        });
      }
    );
  }
}
