import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { Stage } from './Stage';

export class Game {
  private renderer: WebGLRenderer;

  private camera: PerspectiveCamera;

  private scene: Scene;

  constructor(canvas: HTMLCanvasElement) {
    // eslint-disable-next-line no-param-reassign
    canvas.width = window.innerWidth;
    // eslint-disable-next-line no-param-reassign
    canvas.height = window.innerHeight;

    this.renderer = new WebGLRenderer({
      canvas,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    this.camera.position.set(20, 20, 20);
    this.camera.lookAt(0, 0, 0);
    this.scene = new Scene();

    const stage = new Stage(canvas, this.camera);
    this.scene.add(stage.getGroup());

    window.addEventListener('resize', this.resize);

    this.tick();
  }

  private resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
  }

  private tick() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.tick.bind(this));
  }
}
