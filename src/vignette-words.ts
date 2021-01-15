import SubScene from './sub-scene';

export default class VignetteWords {

  private readonly ctx: CanvasRenderingContext2D;
  private readonly cw: number;
  private readonly ch: number;

  private subs: {[id: string]: SubScene}
  private entry: string;
  private currentScene: SubScene;

  private callback: () => void;

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d');
    this.cw = canvas.width;
    this.ch = canvas.height;

    this.ctx.font = '40px Impact';
    this.ctx.fillStyle = 'black';

    this.subs = {
      'ALPHA': new SubScene(
        'ALPHA',
        (callback: () => void) => {
          console.log(`Inside of actions for ${'ALPHA'}`);
          console.log(callback);

          this.ctx.clearRect(0, 0, this.cw, this.ch);      
          this.ctx.fillText('ALPHA', this.cw/2, this.ch/2);

          setTimeout(callback, 2000);
        },
        () => {

        },
        'BRAVO'
      ),

      'BRAVO': new SubScene(
        'BRAVO',
        (callback: () => void) => {
          
          this.ctx.clearRect(0, 0, this.cw, this.ch);      
          this.ctx.fillText('BRAVO', this.cw/2, this.ch/2);

          setTimeout(callback, 2000);
        },
        () => {},
        'CHARLIE'
      ),

      'CHARLIE': new SubScene(
        'CHARLIE',
        (callback: () => void) => {
          
          this.ctx.clearRect(0, 0, this.cw, this.ch);      
          this.ctx.fillText('CHARLIE', this.cw/2, this.ch/2);

          setTimeout(callback, 2000);
        },
        () => {},
        'END'
      ),
    }

    this.entry = 'ALPHA';

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
      return;
    }

    console.log(`Onto scene: ${nextScene}`);
    this.currentScene = this.subs[nextScene];
    this.currentScene.actions(this.next.bind(this));
  }


}