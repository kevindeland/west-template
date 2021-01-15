import SubScene from './sub-scene';

export default class VignetteColors {

  private readonly ctx: CanvasRenderingContext2D;
  private readonly cw: number;
  private readonly ch: number;

  private subs: {[id: string]: SubScene}
  private entry: string;
  private currentScene: SubScene;

  private callback: () => void;

  constructor(private readonly canvas: HTMLCanvasElement, callback: () => void) {
    this.ctx = canvas.getContext('2d');
    this.cw = canvas.width;
    this.ch = canvas.height;
    this.callback = callback;

    this.subs = {
      'RED': new SubScene(
        'RED',
        (callback: () => void) => {
          console.log(`Inside of actions for ${'RED'}`);
          console.log(callback);
          this.ctx.fillStyle = 'red';
          this.ctx.fillRect(0, 0, this.cw, this.ch);

          setTimeout(callback, 2000);
        },
        () => {

        },
        'BLUE'
      ),

      'BLUE': new SubScene(
        'BLUE',
        (callback: () => void) => {
          this.ctx.fillStyle = 'blue';
          this.ctx.fillRect(0, 0, this.cw, this.ch);

          setTimeout(callback, 2000);
        },
        () => {},
        'GREEN'
      ),

      'GREEN': new SubScene(
        'GREEN',
        (callback: () => void) => {
          this.ctx.fillStyle = 'green';
          this.ctx.fillRect(0, 0, this.cw, this.ch);

          setTimeout(callback, 2000);
        },
        () => {},
        'END'
      ),
    }

    this.entry = 'RED';

  }

  begin() {
    console.log(`begin with entry ${this.entry}`);
    this.currentScene = this.subs[this.entry];
    console.log(this.currentScene);
    this.currentScene.actions(this.next.bind(this));
  }

  // wtf m8? this is undefined
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
  next() {
    console.log('Inside of next()');
    console.log(this);
    console.log(this.currentScene);

    console.log(`Done with scene: ${this.currentScene.id}`);
    const nextScene = this.currentScene.nextId;

    if (nextScene === 'END') {
      console.log('-----------')
      console.log('ALL DONE!!!')
      console.log('-----------')
      this.callback();
      return;
    }

    console.log(`Onto scene: ${nextScene}`);
    this.currentScene = this.subs[nextScene];
    this.currentScene.actions(this.next.bind(this));
  }


}