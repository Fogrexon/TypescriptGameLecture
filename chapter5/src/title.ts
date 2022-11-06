import { Group, Scene } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import titleFbx from './models/title.glb?url';

export class Title {
  private model: Group | null = null;

  constructor(scene: Scene, fileLoader: GLTFLoader) {
    fileLoader.load(titleFbx, (modelData) => {
      this.model = modelData.scene;
      if (!this.model) return;
      this.model.position.set(0, 3, 0);
      this.model.scale.set(1, 1, 1);
      scene.add(this.model);
    });
  }

  public update(time: number) {
    if (!this.model) return;
    // 3章 タイトル文字を動かすアニメーションを書こう
  }
}
