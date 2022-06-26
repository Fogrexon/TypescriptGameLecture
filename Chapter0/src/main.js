const canvas = document.getElementById('cnv');
const ctx = canvas.getContext('2d');

const playerImage = new Image();
playerImage.src = './icon.jpg';
const playerData = {
  x: 50,
  y: 100,
  image: playerImage,
}

playerImage.onload = function () {
  drawPlayer(playerData, ctx);
}

// lib.jsの中身が全部見える
console.log(drawPlayer, PLAYER_WIDTH, PLAYER_HEIGHT);
