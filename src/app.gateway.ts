import {
  OnGatewayConnection, OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse
} from '@nestjs/websockets';
import {Logger} from "@nestjs/common";
import {Socket, Server} from "socket.io";

@WebSocketGateway(8181, { namespace: 'gateway' })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  // @WebSocketServer() wss: Server;

  private logger : Logger = new Logger('AppGateway');

  afterInit(server: Server){
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket, ...args: any[]){
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): WsResponse<string>/*or void */  {
    // this.wss.emit('msgToClient', text);
    // client.emit('msgToClient', 'Hello from server');
    return {event: 'msgToClient', data: text};
  }
}
