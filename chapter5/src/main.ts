import { Game } from './Game';
import './style.css';

const startGame = () => {
  const canvas = document.getElementById('cnv') as HTMLCanvasElement;
  const game = new Game(canvas);
};

startGame();
