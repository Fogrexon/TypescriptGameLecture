const PLAYER_WIDTH = 64;
const PLAYER_HEIGHT = 64;

function drawPlayer(data, ctx) {
  ctx.drawImage(data.image, data.x, data.y, PLAYER_WIDTH, PLAYER_HEIGHT);
}