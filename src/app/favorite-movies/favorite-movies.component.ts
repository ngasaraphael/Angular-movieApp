import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss'],
})
export class FavoriteMoviesComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user') || '');
  favMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUserFavs();
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { name, description },
      width: '500px',
    });
  }

  openDirectorDialog(
    name: string,
    bio: string,
    birthday: any,
    deathday: any
  ): void {
    this.dialog.open(MovieDirectorComponent, {
      data: {
        name,
        bio,
        birthday,
        deathday,
      },
      width: '500px',
    });
  }

  openSynopsisDialog(
    title: string,
    description: string,
    releaseDate: any,
    rating: any
  ): void {
    this.dialog.open(MovieDirectorComponent, {
      data: {
        title,
        description,
        releaseDate,
        rating,
      },
      width: '500px',
    });
  }

  getUserFavs(): void {
    this.fetchApiData.getFavoriteMovies(this.user._id).subscribe((res: any) => {
      this.favMovies = res.favorites;
      return this.favMovies;
    });
  }

  addToFavs(movieId: string, title: string): void {
    this.fetchApiData
      .addToFavMovie(this.user.username, movieId)
      .subscribe((res: any) => {
        this.snackBar.open(
          `${title} has been added to your favorite movies! ✔️`,
          'Cool',
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
          `${title} has been removed from your favorite movies `,
          'ok',
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
