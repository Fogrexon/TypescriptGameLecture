import {
  Camera, EventDispatcher, Object3D, Raycaster, Renderer, Vector2,
} from 'three';

export class Interaction extends EventDispatcher {
  constructor(
    renderer: Renderer,
    private target: Object3D,
    private camera: Camera,
  ) {
    super();
    this.target = target;
    this.camera = camera;
    renderer.domElement.addEventListener('click', this.onClick.bind(this));
  }

  private onClick(event: MouseEvent) {
    const raycaster = new Raycaster();
    const mouse = new Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, this.camera);
    const intersects = raycaster.intersectObject(this.target, true);
    this.dispatchEvent({ type: 'click', intersects });
  }
}
