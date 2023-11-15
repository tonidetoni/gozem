import { Server, Socket } from 'socket.io';
import { Location } from '@modules/package/interfaces/package.interface';

export let socketIODeliveryObject: Server;

export class DeliverySocketHandler {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    socketIODeliveryObject = io;
  }

  public listen(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log('socket connected')
      socket.on('location_changed', ({ location, deliveryId }) => {
        console.log('location', location)
        this.io.emit(`location_changed-${deliveryId}`, location);
      });
    });
  }
}
