import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { StorageService } from './modules/storage/storage.service';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly storageService: StorageService) {}

  @WebSocketServer()
  private wss: Server;

  afterInit(server: Server) {
    console.log('Server initialized');
  }
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('UpateNewOrders')
  handleMessage(client: Socket, text: string): void {
    // Sends client latest order data on real time
    this.wss.emit('UpdateNewOrderToClient', this.storageService.getOrders());
  }
}
