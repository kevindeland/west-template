
// 🖌️  🖌️  🖌️  CANVAS  🖌️  🖌️  🖌️  
function circle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath();
    
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.closePath();
  
  ctx.fill();
}

class Position {
  constructor(public x: number, public y: number) {}
}

export {circle, Position}
