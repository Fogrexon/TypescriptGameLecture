import {
  Camera, Group, Raycaster, Vector2,
} from 'three';

export class Interaction {
  private raycaster: Raycaster;

  private camera: Camera;

  private interactions: Group;

  private mouse: Vector2;

  constructor(canvas: HTMLCanvasElement, camera: Camera, interactions: Group) {
    this.raycaster = new Raycaster();
    this.mouse = new Vector2();
    this.camera = camera;
    this.interactions = interactions;
    canvas.addEventListener('click', this.click.bind(this));
  }

  private click(e: MouseEvent) {
    this.mouse.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1,
    );
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactions.children, true);

    if (intersects.length > 0) {
      intersects[0].object.userData.onClick();
    }
  }
}
