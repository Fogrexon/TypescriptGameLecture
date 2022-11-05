import { Group, Scene } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import titleFbx from './tictactoe.fbx?url';

export class Title {
  private scene: Scene;

  private model: Group | null = null;

  constructor(scene: Scene, fileLoader: FBXLoader) {
    this.scene = scene;

    fileLoader.load(titleFbx, (modelData) => {
      this.model = modelData;
      this.model.scale.set(0.01, 0.01, 0.01);
      scene.add(this.model);
    });
  }

  public update(time: number) {
    if (!this.model) return;
    this.model.rotation.y = (time / 5 / 1000) * Math.PI * 2;
    this.model.position.y = Math.sin(time / 1 / 1000) * 0.5 + 3;
  }
}
