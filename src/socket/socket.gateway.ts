import { Logger } from '@nestjs/common';
import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger("SOCKET");
  handleConnection(client: Socket) {
    this.logger.log(`SocketId: ${client?.id} connected server`);
  }

  handleDisconnect(client: Socket) {
    this.logger.warn(`SocketId: ${client?.id} disconnected server`);
  }
}
