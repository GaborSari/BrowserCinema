import { BehaviorSubject } from 'rxjs';

export class Movie {
    adult: boolean = false;
    backdrop_path: string = "";
    genre_ids: Array<number> = new Array<number>();
    genres: Array<string> = new Array<string>();
    id: number = -1;
    original_language: string = "en";
    original_title: string = "";
    fullOverview: string = "";
    _overview: string = "";
    popularity: number = -1;
    poster_path: string = "";
    release_date: Date = new Date();
    title: string = "";
    video: string = "";
    vote_average: number = -1;
    vote_count: number = -1;

    countDownStarted = false;
    countDown: number;
    timer = undefined;

    constructor() {
    }

    set overview(str:string){
        this.fullOverview = str;
        this._overview = str;
        if(this.fullOverview.length > 120){
            this._overview = this.fullOverview.slice(0,120) + "...";
        }
    }

    startCountDown(min: number):BehaviorSubject<Boolean> {
        let ret = new BehaviorSubject<Boolean>(false);
        this.countDown = min * 20 * 500;
        this.countDownStarted = true;
        this.timer = setInterval(() => {
            this.countDown = this.countDown - 1000;

            if (this.countDown <= 0) {
                ret.next(true);
                this.countDownStarted = false;
                clearInterval(this.timer);
            }
        }, 1000);
        return ret;
    }

    showMoreOverview(){
        this._overview  = this.fullOverview;
    }


}