
const io = require('socket.io-client')
import Constants from './Constants';


function main() {
  console.log('Hello world')

  console.log(Constants)
  const socket = io()
  socket.emit(Constants.NEW_PLAYER, {}, (cache: string) => { console.log(cache) })
}

main();
