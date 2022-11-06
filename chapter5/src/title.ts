import { Group, Scene } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import titleFbx from './models/title.glb?url';

export class Title {
  private model: Group | null = null;

  constructor(scene: Scene, fileLoader: GLTFLoader) {
    fileLoader.load(titleFbx, (modelData) => {
      this.model = modelData.scene;
      if (!this.model) return;
      this.model.scale.set(1, 1, 1);
      scene.add(this.model);
    });
  }

  public update(time: number) {
    if (!this.model) return;
    this.model.rotation.y = (time / 5 / 1000) * Math.PI * 2;
    this.model.position.y = Math.sin(time / 1 / 1000) * 0.5 + 3;
  }
}
