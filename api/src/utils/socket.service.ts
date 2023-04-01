import { Socket } from 'socket.io';

export class SocketService {
  private static _instance: SocketService;
  private sockets: Record<string, Socket> = {};

  public static get instance(): SocketService {
    if (!this._instance) {
      this._instance = new SocketService();
    }

    return this._instance;
  }

  public registerSocket(socket: Socket) {
    this.sockets[socket.id] = socket;
  }

  public removeSocket(id: string) {
    delete this.sockets[id];
  }

  public getSocket(id: string): Socket {
    return this.sockets[id];
  }
}
