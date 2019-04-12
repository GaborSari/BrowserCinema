import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private permission: NotificationPermission;
    private notifications: Array<Notification> = new Array<Notification>();


    constructor() {
        this.permission = this.isSupported() ? 'default' : 'denied';
        if (this.permission == 'denied') {
            this.requestPermission();
        }
        
    }



    public isSupported(): boolean {
        return 'Notification' in window;
    }

    private requestPermission(): void {
        if ('Notification' in window) {
            Notification.requestPermission(function (status) {
                return this.permission = status;
            });
        }
    }

    add(notifications: Array<Notification>): boolean;

    add(title: string, options?: NotificationOptions): string;

    add(input: Array<Notification> | string, options?: undefined | NotificationOptions): any {

        let ret: boolean = true;

        if (input instanceof Array) {
            input.forEach((item) => {
                try {
                    this.notifications.push(item);
                    ret = ret && true;
                }
                catch{
                    console.error("Cannot add to notifications: " + item);
                    ret = ret && false;
                }
            });
        }

        if (input instanceof String) {
            try {
                this.notifications.push(new Notification(input.toString(), options));
            }
            catch{
                console.error("Cannot add to notification: " + input);
                ret = ret && false;
            }
        }

        return ret;
    }

}

