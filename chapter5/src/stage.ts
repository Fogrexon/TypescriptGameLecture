import {
  BoxGeometry,
  Camera,
  EventDispatcher,
  Mesh,
  MeshBasicMaterial,
  Renderer,
  Scene,
} from 'three';
import {
  BoardBit, judgeResult, Player, toBit,
} from './tictactoe/utils';
import { Interaction } from './utils/interaction';

export class Stage extends EventDispatcher {
  private scene: Scene;

  private interaction: Interaction;

  private circleModelTemplate: Mesh | null = null;

  private crossModelTemplate: Mesh | null = null;

  constructor(renderer: Renderer, scene: Scene, camera: Camera) {
    super();

    this.scene = scene;

    // 2章 自分の好きな図形のマーカーを作ろう

    // this.circleModelTemplate =
    // this.crossModelTemplate =

    // 1章 ボードを用意する

    // const board =
    // const wall1 =
    // const wall2 =
    // const wall3 =
    // const wall4 =

    // クリック判定 1章を組んだのちにコメントアウトを外す
    // this.interaction = new Interaction(renderer, board, camera);
    // this.interaction.addEventListener('click', (event) => {
    //   if (event.intersects.length === 0) return;
    //   if (judgeResult(this.circleBit, this.crossBit) !== 'none') return;
    //   const intersect = event.intersects[0];
    //   const { point } = intersect;
    //   const x = Math.round(point.x / 3);
    //   const y = Math.round(point.z / 3);

    //   const bit = toBit(x, y);

    //   // eslint-disable-next-line no-bitwise
    //   if ((this.circleBit & bit) !== 0 || (this.crossBit & bit) !== 0) return;
    //   this.dispatchEvent({ type: 'place', x, y });
    // });
  }

  // マーカーを配置する
  public placeMarkerModel(x: number, y: number, playerType: Player) {
    const marker = playerType === 'circle' ? this.circleModelTemplate?.clone() : this.crossModelTemplate?.clone();
    if (!marker) return;
    marker.position.set(x * 3, 0.1, y * 3);
    this.scene.add(marker);
  }
}
