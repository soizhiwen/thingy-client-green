import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../state/notification/notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    constructor(private http: HttpClient) { }

    getNotifications(): Observable<Notification[]> {
        return this.http.get<Notification[]>('http://localhost:8080/notification-views/');
    }
    getNotificationsByPlant(plantId:number): Observable<Notification[]> {
      return this.http.get<Notification[]>('http://localhost:8080/notifications/plants/'+ plantId);
  }
    updateNotification(notifications: Notification[]) {
        return this.http.patch<Notification[]>(
            'http://localhost:8080/notification-views/',
            notifications
        );
    }


}
