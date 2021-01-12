
import * as io from 'socket.io-client';
import Constants from './Constants';
import CanvasClicker from './canvas-clicker';
import {Position} from './utils';

function main() {

  // 📤  📤 emitter: NEW_PLAYER
  const socket: SocketIOClient.Socket = io();
  socket.emit(Constants.NEW_PLAYER, {}, (cache: string) => { console.log(cache) })

  const canvas = <HTMLCanvasElement>document.getElementById('main');
  const clicker = new CanvasClicker(canvas, socket);

  //clicker.draw();

  // 📥  📥 receiver: CLICK_POSITION
  socket.on(Constants.CLICK_POSITION, (position:Position) => {
    clicker.drawClick(position);
  })

}

main();
