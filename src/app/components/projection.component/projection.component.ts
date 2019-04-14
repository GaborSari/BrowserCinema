import { Component, OnInit, HostListener } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    templateUrl: './projection.component.html',
    styles: ['#iframe{width:100%;height:100%;}']
})
export class ProjectionComponent implements OnInit {

    private movieId = -1;
    public loaded = false;
    public clientHeight = window.innerHeight;
    public videoSrc:SafeUrl;
    constructor(private movieService: MovieService, private route: ActivatedRoute,private sanitizer:DomSanitizer) {

    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.clientHeight = window.innerHeight;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.movieId = params['id'];

                this.movieService.getYoutubeLink(this.movieId.toString()).subscribe(link => {
                    if (!link) { return; }
                    this.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(link);
                    this.loaded = true
                });
            }
        });
    }
}
