

export default class SubScene {
  public readonly id: string;
  public actions: (callback: () => void) => void;
  public callback: () => void;
  public readonly nextId: string;

  constructor(id: string, actions: (callback: () => void) => void, callback: () => void, nextId: string) {
    this.id = id;
    this.actions = actions;
    this.callback = callback;
    this.nextId = nextId;
  }
}