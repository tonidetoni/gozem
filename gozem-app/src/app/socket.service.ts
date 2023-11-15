import { Injectable } from '@angular/core';
import io from 'socket.io-client'
import {environment} from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket = io(environment.serverUrl, { transports: ['websocket'] })

  constructor() { }
}
