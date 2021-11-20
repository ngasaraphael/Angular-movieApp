// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  favMovies: any[] = this.user.favoriteMovie;

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUserFavs();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }
  /**
   * Opens the Genre dialog
   * @param title
   * @param description
   */
  openMovieGenreDialog(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { name, description },
    });
  }

  /**
   * Opens the Director dialog
   * @param name
   * @param Bio
   */
  openMovieDirectorDialog(Name: string, Bio: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { Name, Bio },
    });
  }

  //route to user profile
  profile(): void {
    this.router.navigate(['profile']);
  }

  //route to user favorites
  favorites(): void {
    this.router.navigate(['favorites']);
  }

  //Get favs
  getUserFavs(): any {
    this.fetchApiData
      .getFavoriteMovies(this.user.username)
      .subscribe((res: any) => {
        this.favMovies = res.Favorites;
        return this.favMovies;
      });
  }

  //add to fav
  addToFavs(movieId: string, title: string): void {
    this.fetchApiData
      .addToFavMovie(this.user.username, movieId)
      .subscribe((res: any) => {
        this.snackBar.open(
          `${title} has been added to your favorite movies`,
          'ok',
          {
            duration: 2000,
          }
        );
        this.ngOnInit();
      });
    return this.getUserFavs();
  }

  removeFromFavs(movieId: string, title: string): void {
    this.fetchApiData
      .deleteMovie(this.user.username, movieId)
      .subscribe((res: any) => {
        this.snackBar.open(
          `${title} has been removed from your favorite movies ✔️`,
          'Alright',
          {
            duration: 2000,
          }
        );
        this.ngOnInit();
      });
    return this.getUserFavs();
  }

  isFav(movieId: string): boolean {
    return this.favMovies.some((movie) => movie._id === movieId);
  }

  toggleFavs(movie: any): void {
    this.isFav(movie._id)
      ? this.removeFromFavs(movie._id, movie.Title)
      : this.addToFavs(movie._id, movie.Title);
  }
}
