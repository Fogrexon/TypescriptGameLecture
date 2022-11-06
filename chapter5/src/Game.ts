import {
  MOUSE, PerspectiveCamera, Scene, WebGLRenderer,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Stage } from './stage';
import { Title } from './title';
import { TicTacToe } from './tictactoe';

export const Game = (canvas: HTMLCanvasElement) => {
  // three.jsのセットアップ
  const renderer = new WebGLRenderer({
    canvas,
  });
  renderer.setClearAlpha(0.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0);

  // リサイズイベント
  const resize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
  };

  window.addEventListener('resize', resize);

  // ぐるぐる見回す用
  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.mouseButtons = {
    RIGHT: MOUSE.ROTATE,
    MIDDLE: MOUSE.DOLLY,
    LEFT: MOUSE.PAN,
  };
  orbitControls.enableZoom = false;
  orbitControls.enablePan = false;
  orbitControls.enableDamping = true;
  orbitControls.dampingFactor = 0.1;
  orbitControls.maxPolarAngle = Math.PI * 0.3;
  orbitControls.minPolarAngle = Math.PI * 0.3;

  // シーンのセットアップ
  const fbxLoader = new GLTFLoader();
  const scene = new Scene();
  const title = new Title(scene, fbxLoader);
  const stage = new Stage(renderer, scene, camera, fbxLoader);

  // ゲームAIのセットアップ
  const tictactoe = new TicTacToe();
  stage.addEventListener('place', (event) => {
    if (tictactoe.getResult() !== 'none') return;
    const flag = tictactoe.tryPlaceCircle(event.x, event.y);
    if (!flag) return;
    stage.placeMarkerModel(event.x, event.y, 'circle');
    if (tictactoe.getResult() !== 'none') return;
    const crossPlace = tictactoe.placeNextCross();
    stage.placeMarkerModel(crossPlace.x, crossPlace.y, 'cross');
  });

  const tick = (time: number) => {
    orbitControls.update();
    title.update(time);
    renderer.render(scene, camera);
    requestAnimationFrame(tick.bind(this));
  };

  requestAnimationFrame(tick.bind(this));
};
