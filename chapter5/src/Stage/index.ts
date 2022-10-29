import {
  BoxBufferGeometry,
  Camera,
  Group, Mesh, MeshBasicMaterial, PlaneGeometry,
} from 'three';
import { Interaction } from './Interaction';

const stageWidth = 40;
const stageHeight = 40;

export class Stage {
  private stageRoot: Group;

  private interactionGroup: Group;

  private boxGroup: Group;

  private interaction: Interaction;

  constructor(canvas: HTMLCanvasElement, camera: Camera) {
    this.stageRoot = new Group();
    this.interactionGroup = new Group();
    this.boxGroup = new Group();
    this.init();
    this.stageRoot.add(this.interactionGroup);
    this.stageRoot.add(this.boxGroup);

    this.interaction = new Interaction(canvas, camera, this.interactionGroup);
  }

  private init() {
    for (let i = 0; i < stageWidth; i += 1) {
      for (let j = 0; j < stageHeight; j += 1) {
        const plane = new Mesh(
          new PlaneGeometry(1, 1, 1),
          new MeshBasicMaterial({ color: 'red' }),
        );
        plane.rotation.set(-Math.PI / 2, 0, 0);
        plane.userData.onClick = this.clickBlock(i, j, plane);
        plane.position.set(i - stageWidth / 2, 0, j - stageHeight / 2);
        this.interactionGroup.add(plane);
      }
    }
  }

  public clickBlock(x: number, y: number, target: Mesh) {
    return () => {
      const cube = new Mesh(
        new BoxBufferGeometry(1, 1, 1),
        new MeshBasicMaterial({ color: 'blue' }),
      );
      cube.position.set(x - stageWidth / 2, 0, y - stageHeight / 2);
      this.boxGroup.add(cube);
      this.interactionGroup.remove(target);
    };
  }

  public getGroup(): Group {
    return this.stageRoot;
  }

  public getInteractions(): Group {
    return this.interactionGroup;
  }
}
