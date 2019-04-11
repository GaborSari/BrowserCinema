export class Movie{
    adult:boolean = false;
    backdrop_path:string = "";
    genre_ids:Array<number> = new Array<number>();
    genres:Array<string> = new Array<string>();
    id:number = -1;
    original_language:string = "en";
    original_title:string = "";
    overview:string = "";
    popularity:number = -1;
    poster_path:string = "";
    release_date:Date = new Date();
    title:string = "";
    video:string = "";
    vote_average:number = -1;
    vote_count:number = -1;
    projectDate:Date = new Date();

    constructor(){
        this.projectDate = new Date(this.projectDate.setMinutes(this.projectDate.getMinutes() + 5));
    }
}