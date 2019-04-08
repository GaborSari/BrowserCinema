import { Component, HostListener } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/models/Movie';
const delay = ms => new Promise(res => setTimeout(res, ms));

@Component({
  templateUrl: './movies.component.html'
})
export class MoviesComponent {

  public cardClass = "ui floated four cards";
  public movies: Array<Movie> = new Array<Movie>();
  private pageIndex = 1;
  private year = new Date().getFullYear();
  public loaded = false;

  constructor(private movieService: MovieService) {
    this.loadMovies(this.year,this.pageIndex);
    if(window.innerWidth < 991){
      this.cardClass = "ui floated two cards";
    }
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

  async loadMovies(year:number,pageIndex:number){
    this.loaded = false;
    await delay(500);//fake waiting
    this.movieService.getPopularMovies(year,pageIndex).subscribe(movies => {
      if (movies.length > 0) {
        for (let movie of movies) {
          this.movies.push(movie);
        }
        this.loaded = true;
      }
    });
  }

}
