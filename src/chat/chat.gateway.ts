import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })  // Enable CORS if you're calling from a different origin
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Handle new connections
  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
    // You can emit a message to the client upon connection
    this.server.emit('message', 'Welcome to the chat!');
  }

  // Handle disconnections
  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  // Handle messages from clients
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    console.log('Message received:', payload);
    // Emit message to all connected clients
    this.server.emit('message', payload);
    return 'Message sent';
  }
}
