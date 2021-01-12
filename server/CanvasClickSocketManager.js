
const SocketManager = require('./SocketManager')

class CanvasClickSocketManager extends SocketManager {

  constructor() {
    super()
  }

  static create() {
    return new CanvasClickSocketManager();
  }

  sendClickToClients(position) {
    super._sendStateToClients('click-position', position)
  }
}

module.exports = CanvasClickSocketManager