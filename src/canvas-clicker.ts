
import Constants from './Constants';

class Position {
  constructor(public x: number, public y: number) {}
}

export default class CanvasClicker {

  private readonly ctx: CanvasRenderingContext2D;

  constructor(private readonly canvas: HTMLCanvasElement, private readonly socket: SocketIOClient.Socket) {
    this.ctx = this.canvas.getContext('2d');

    // 🐭  🐭 MOUSE 🐭  🐭  
    // 📤  📤 emitter 📤  📤  
    // bind mouse clicks to a socket emit event
    this.canvas.addEventListener('click', e => {
      console.log(e);
      this.emitClick(new Position(10, 10));
    })
    
    //---- CONTINUE HERE -----
  }

  emitClick(p: Position) {
    this.socket.emit(Constants.CLICK_POSITION, p)
  }

}