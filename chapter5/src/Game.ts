import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { Title } from './title';

export class Game {
  private renderer: WebGLRenderer;

  private camera: PerspectiveCamera;

  private scene: Scene;

  private title: Title;

  constructor(canvas: HTMLCanvasElement) {
    // eslint-disable-next-line no-param-reassign
    canvas.width = window.innerWidth;
    // eslint-disable-next-line no-param-reassign
    canvas.height = window.innerHeight;

    this.renderer = new WebGLRenderer({
      canvas,
    });
    this.renderer.setClearColor(0xff0000, 0.5);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    this.camera.position.set(5, 5, 5);
    this.camera.lookAt(0, 0, 0);
    this.scene = new Scene();

    const fbxLoader = new FBXLoader();

    this.title = new Title(this.scene, fbxLoader);

    window.addEventListener('resize', this.resize.bind(this));

    requestAnimationFrame(this.tick.bind(this));
  }

  private resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
  }

  private tick(time: number) {
    this.title.update(time);
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.tick.bind(this));
  }
}
