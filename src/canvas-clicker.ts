
import Constants from './Constants';
import {circle, Position} from './utils';

export default class CanvasClicker {

  private readonly ctx: CanvasRenderingContext2D;

  constructor(private readonly canvas: HTMLCanvasElement, private readonly socket: SocketIOClient.Socket) {
    this.ctx = this.canvas.getContext('2d');

    // 🐭  🐭 MOUSE click 🐭  🐭  
    this.canvas.addEventListener('click', e => {
      this.emitClick(new Position(Math.random() * 300, Math.random() * 300));
    })
  }

  emitClick(p: Position) {
    // 📤  📤 emitter: CLICK_POSITION
    this.socket.emit(Constants.CLICK_POSITION, p)
  }

  drawClick(p: Position) {
    // 🖌️  🖌️  🖌️  CANVAS circle 🖌️  🖌️  🖌️  
    this.ctx.fillStyle = 'green'
    circle(this.ctx, p.x, p.y, 10)
  }

}