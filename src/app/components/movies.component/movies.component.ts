import { Component, HostListener } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/models/Movie';

@Component({
  templateUrl: './movies.component.html'
})
export class MoviesComponent {
  public movies: Array<Movie> = new Array<Movie>();
  private pageIndex = 1;
  private year = new Date().getFullYear();
  constructor(private movieService: MovieService) {
    this.loadMovies(this.year,this.pageIndex);
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos == max) {
      this.pageIndex++;
      this.loadMovies(this.year,this.pageIndex);
    }
  }

  loadMovies(year:number,pageIndex:number){
    this.movieService.getPopularMovies(year,pageIndex).subscribe(movies => {
      if (movies.length > 0) {
        for (let movie of movies) {
          this.movies.push(movie);
        }
      }
    });
  }

}
