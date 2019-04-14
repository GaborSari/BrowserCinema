import { Injectable } from '@angular/core';
import { Movie } from '../models/Movie';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private permission: NotificationPermission;
    private notifications: Array<Notification> = new Array<Notification>();


    constructor(private snackBar: MatSnackBar) {

        this.requestPermission();

        this.permission = this.isSupported() ? 'default' : 'denied';


    }

    public isSupported(): boolean {
        return 'Notification' in window;
    }

    private requestPermission(): void {
        if ('Notification' in window) {
            Notification.requestPermission(status => {
                this.permission = status;
            });
        }
    }


    add(movie: Movie): boolean {
        let ret: boolean = true;


        try {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || this.permission == 'denied') {
                let snackBarRef = this.snackBar.open(movie.title + " is started!", 'Take a seat!', {
                    duration: 3000
                });
                snackBarRef.onAction().subscribe(() => {
                    var tab = window.open('./watch/' + movie.id, '_blank');
                    tab.focus();
                });
            }
            else {
                var notification = new Notification(movie.title + " is started!", {
                    icon: './assets/images/movie.png',
                    body: "Hey there! Take a seat!",
                });

                notification.onclick = function () {

                    var tab = window.open('./watch/' + movie.id, '_blank');
                    tab.focus();
                };
            }


        }
        catch{
            console.error("Cannot add to notification: " + movie.title);
            ret = ret && false;
        }


        return ret;
    }

}

