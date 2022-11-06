import {
  MOUSE, PerspectiveCamera, Scene, WebGLRenderer,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Stage } from './stage';
import { Title } from './title';

export const Game = (canvas: HTMLCanvasElement) => {
  // eslint-disable-next-line no-param-reassign
  canvas.width = window.innerWidth;
  // eslint-disable-next-line no-param-reassign
  canvas.height = window.innerHeight;

  const renderer = new WebGLRenderer({
    canvas,
  });
  renderer.setClearAlpha(0.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0);
  const scene = new Scene();

  const fbxLoader = new GLTFLoader();

  const title = new Title(scene, fbxLoader);
  const stage = new Stage(renderer, scene, camera, fbxLoader);

  const resize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
  };

  window.addEventListener('resize', resize);

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

  const tick = (time: number) => {
    orbitControls.update();
    stage.update();
    title.update(time);
    renderer.render(scene, camera);
    requestAnimationFrame(tick.bind(this));
  };

  requestAnimationFrame(tick.bind(this));
};
