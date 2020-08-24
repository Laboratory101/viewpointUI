import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class WebsocketService {

    private socket: SocketIOClient.Socket;

    constructor() {
        this.socket = io(environment.apiURL);
    }

    joinRoom(room: string): void {
        this.socket.emit('join-room', room)
    }

    broadcastMessage(): Observable<Array<any>> {
        let broadcast = new Observable<Array<any>>(observer => {
            this.socket.on('send-message', data => observer.next(data));
            return () => { this.socket.disconnect() }
        });
        return broadcast;
    }
}