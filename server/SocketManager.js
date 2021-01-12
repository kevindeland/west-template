/**
 * The Performance class that handles clients/players
 */

class SocketManager {
  
  constructor() {

    if (this.constructor == SocketManager) {
      throw new Error("Abstract classes can't be instantiated.")
    }

    /**
     * There should really only be one, but.... make a map just in case
     */
    this.admins = new Map()

    /**
     * Map containing all connected socket ids and instances
     */
    this.clients = new Map()

    /**
     * Map containing all connected socket ids and players
     * associated with them. Should be parallel to sockets.
     */
    this.players = new Map()

  }

  /**
   * Create an admin
   * TODO: removeAdmin, checkForDuplicates, etc
   * @param {Object} socket The socket object of the admin
   */
  addNewAdmin(socket) {
    this.admins.set(socket.id, socket)
  }

  _sendStateToAdmins(message, state) {
    console.log('Sending state to admins')
    this.admins.forEach((client, socketId) => {
      console.log(this.admins)
      console.log(socketId)
      // 📤  📤 emitter 📤  📤
      this.admins.get(socketId).emit(message, state)
    })
  }

  /**
   * Creates a new player with the given name and ID.
   * @param {string} name The display name of the player.
   * @param {Object} socket The socket object of the player
   */
  addNewPlayer(name, socket) {
    this.clients.set(socket.id, socket)
    this.players.set(socket.id, name); // this can contain a name
    console.log('--- players after added ---')
    console.log(this.players)
    console.log('---------------------------')
  }

  /**
   * Updates the state of all the objects in the game.
   */
  update() {
    // SKELETON: see tankanarchy for things you can do here, like Collision Detection.
  }

  /**
   * Protected method to send any state to clients
   * 
   * @param {string} message the Broadcast name
   * @param {any} state state as defined by child class
   */
  _sendStateToClients(message, state) {

    // Send to each player.
    // 📤  📤 emitter 📤  📤
    this.clients.forEach((client, socketID) => {
      this.clients.get(socketID).emit(message, state)
    })
  }

  _sendStateToClient(id, message, state) {
    // console.log('_sendStateToClient')
    // console.log(this.clients)
    // 📤  📤 emitter 📤  📤
    this.clients.get(id).emit(message, state)
  }

  _buildState() {
    throw new Error("Method '_buildState()' must be implemented.")
  }

  /**
   * Send global state to all clients.
   */
  sendStateToClients() {
    throw new Error("Method 'sendStateToClients()' must be implemented.")
  }

  /**
   * Remove Client from our list of clients
   * @param {String} socketID the ID of the socket to remove
   */
  removeClient(socketID) {

    if (this.clients.has(socketID)) {
      this.clients.delete(socketID)
    }
    if (this.players.has(socketID)) {
      const player = this.players.get(socketID)
      this.players.delete(socketID)
    }
  }

  removeAdmin(socketID) {
    if (this.admins.has(socketID)) {
      console.log('removing admin')
      this.admins.delete(socketID)
    }
  }
}

module.exports = SocketManager
