import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/Movie';

const APIKEY = '0a947ed34cd9d8951d42047a298a1eb6';

@Injectable({
    providedIn: 'root'
})
export class MovieService {

    public loaded = new BehaviorSubject(false);
    public genres = Array<any>();

    constructor(private httpClient: HttpClient) {
        let x = this.httpClient.get('https://api.themoviedb.org/3/genre/movie/list?api_key=' + APIKEY).subscribe((genres: any) => {
            if (genres.genres) {
                this.loaded.next(true);
                for (let genre of genres.genres) {
                    this.genres[genre.id] = genre.name;
                }
            }
        }, () => {
            console.log("ERROR");
        });
    }

    getPopularMovies(year: number, page: number): BehaviorSubject<Array<Movie>> {
        let ret = new BehaviorSubject(new Array<Movie>());
        this.httpClient.get('https://api.themoviedb.org/3/discover/movie?primary_release_year=' + year + '&sort_by=popularity.desc&page=' + page + '&api_key=' + APIKEY).subscribe(
            (json: any) => {
                if (json !== undefined && json != null) {
                    if (json.results) {
                        let movies = new Array<Movie>();
                        for (let movie of json.results) {
                            let newMovie:Movie = (Object.assign(new Movie(), movie));
                            newMovie.genres = newMovie.genre_ids.map(g=> this.genres[g]);
                            movies.push(newMovie);
                        }
                        ret.next(movies);
                    }
                }
            }, () => { console.log('ERROR ') }, () => {

            });
        return ret;
    }
}