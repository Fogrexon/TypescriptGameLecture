import { Game } from './Game';
import './style.css';
import { toBit, toCoordinate } from './tictactoe/utils';

const tutorialWrapper = document.getElementById('tutorial-wrapper');
const tutorialClose = document.getElementById('tutorial-close');
tutorialClose?.addEventListener('click', () => {
  if (!tutorialWrapper) return;
  tutorialWrapper.dataset.visible = 'false';
});

const canvas = document.getElementById('cnv') as HTMLCanvasElement;
Game(canvas);
