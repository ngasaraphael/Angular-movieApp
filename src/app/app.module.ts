import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MovieGenreComponent } from './movie-genre/movie-genre.component';
import { MovieDirectorComponent } from './movie-director/movie-director.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'favorites', component: FavoriteMoviesComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    LoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    UserProfileComponent,
    MovieGenreComponent,
    MovieDirectorComponent,
    EditProfileComponent,
    FavoriteMoviesComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
