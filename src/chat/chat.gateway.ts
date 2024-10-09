import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserEntity } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';

@WebSocketGateway({ cors: true }) // Enable CORS if you're calling from a different origin
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly connectedClients: Map<string, string> = new Map();

  constructor(private readonly dataSource: DataSource) {}

  // Handle new connections
  handleConnection(client: Socket) {
    const userId = this.getUserIdFromClient(client);

    this.connectedClients.set(userId as string, client.id);

    // You can emit a message to the client upon connection
    this.server.emit('message', 'Welcome to the chat!');
  }

  // Handle disconnections
  handleDisconnect() {}

  // Handle messages from clients
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    // Emit message to all connected clients
    this.server.emit('message', payload);
    return 'Message sent';
  }

  async handleNotifyUserOrder(payload: string) {
    const admin = await this.dataSource
      .getRepository(UserEntity)
      .findOneBy({ email: 'super_admin@gmail.com' });

    if (admin) {
      const socketId = this.connectedClients.get(admin.id.toString());

      if (socketId) {
        this.server.to(socketId).emit('notify-order', payload);
      }
    }
  }

  async handleNotifyUpdateOrder(payload: string, userId: number) {
    const socketId = this.connectedClients.get(userId.toString());

    if (socketId) {
      this.server.to(socketId).emit('notify-update-order', payload);
    }
  }

  getUserIdFromClient(client: Socket): string | string[] {
    // Logic to extract userId, e.g., from query params or token
    return client.handshake.query.userId;
  }
}
