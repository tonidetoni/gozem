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
      console.log('socket connected');
      socket.on('location_changed', ({ location, deliveryId }) => {
        this.io.emit(`location_changed-${deliveryId}`, location);
      });

      socket.on('status_changed', ({ delivery, packageId, status }) => {
        console.log('package', status, packageId, delivery);
        this.io.emit(`status_changed-${packageId}`, { status, delivery });
      });
    });
  }
}
