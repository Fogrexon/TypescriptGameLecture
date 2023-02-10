import './style.css';

import { Game } from './Game';
import { Network } from './Network';
import { ScreenManager } from './Screen/ScreenManager';
import { Title } from './Title';

const titleDom = document.querySelector('#title') as HTMLElement;
const gameDom = document.querySelector('#game') as HTMLElement;
const canvas = gameDom.querySelector('#canvas') as HTMLCanvasElement;

console.log(titleDom, gameDom, canvas);

const network = new Network('ws://localhost:3000');

const title = new Title(titleDom, network);
const game = new Game(gameDom, canvas, network);

ScreenManager.addScreen('title', title);
ScreenManager.addScreen('game', game);

ScreenManager.start('title');
