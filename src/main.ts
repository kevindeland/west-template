
import * as io from 'socket.io-client';
import Constants from './Constants';
import CanvasClicker from './canvas-clicker';


function main() {

  // 📤  📤 emitter 📤  📤  
  const socket: SocketIOClient.Socket = io();
  socket.emit(Constants.NEW_PLAYER, {}, (cache: string) => { console.log(cache) })

  const canvas = <HTMLCanvasElement>document.getElementById('main');
  const clicker = new CanvasClicker(canvas, socket);

  //clicker.draw();

}

main();
