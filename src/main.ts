
import * as io from 'socket.io-client';
import Constants from './Constants';
import CanvasClicker from './canvas-clicker';
import {Position} from './utils';
import VignetteColors from './vignette-colors';
import VignetteWords from './vignette-words';
import SubScene from './sub-scene';

function main() {

  // 📤  📤 emitter: NEW_PLAYER
  /*const socket: SocketIOClient.Socket = io();
  socket.emit(Constants.NEW_PLAYER, {}, (cache: string) => { console.log(cache) })
*/

  const colorCanvas = <HTMLCanvasElement>document.getElementById('colors');
  const wordCanvas = <HTMLCanvasElement>document.getElementById('words');


  function allDone() {
    console.log('-----------')
    console.log('ALL DONE!!!')
    console.log('-----------')
  }

  function launchWords() {
    const words = new VignetteWords(wordCanvas, allDone);
    words.begin();
  }

  function launchColors() {
    const colors = new VignetteColors(colorCanvas, launchWords);
    colors.begin();
  }

  launchColors();


/*  const clicker = new CanvasClicker(canvas, socket);

  //clicker.draw();

  // 📥  📥 receiver: CLICK_POSITION
  socket.on(Constants.CLICK_POSITION, (position:Position) => {
    clicker.drawClick(position);
  })
*/
}

main();
