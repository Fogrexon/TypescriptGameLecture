import {
  BoxGeometry,
  Camera,
  ConeGeometry,
  EventDispatcher,
  Mesh,
  MeshBasicMaterial,
  Renderer,
  Scene,
  SphereGeometry,
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

  private circleBit: BoardBit = 0;

  private crossBit: BoardBit = 0;

  constructor(renderer: Renderer, scene: Scene, camera: Camera) {
    super();

    this.scene = scene;

    // 2章 自分の好きな図形のマーカーを作ろう

    // this.circleModelTemplate =
    // this.crossModelTemplate =

    const board = new Mesh(
      new BoxGeometry(9, 0.1, 9),
      new MeshBasicMaterial({ color: 0xdddddd }),
    );
    board.position.set(0, 0.05, 0);
    scene.add(board);

    const wall = new Mesh(
      new BoxGeometry(9, 0.4, 0.1),
      new MeshBasicMaterial({ color: 0x333333 }),
    );
    wall.position.set(0, 0.2, 1.5);
    board.add(wall);

    const wall2 = new Mesh(
      new BoxGeometry(9, 0.4, 0.1),
      new MeshBasicMaterial({ color: 0x333333 }),
    );
    wall2.position.set(0, 0.2, -1.5);
    board.add(wall2);

    const wall3 = new Mesh(
      new BoxGeometry(0.1, 0.4, 9),
      new MeshBasicMaterial({ color: 0x333333 }),
    );
    wall3.position.set(1.5, 0.2, 0.0);
    board.add(wall3);

    const wall4 = new Mesh(
      new BoxGeometry(0.1, 0.4, 9),
      new MeshBasicMaterial({ color: 0x333333 }),
    );
    wall4.position.set(-1.5, 0.2, 0.0);
    board.add(wall4);

    // クリック判定
    this.interaction = new Interaction(renderer, board, camera);
    this.interaction.addEventListener('click', (event) => {
      if (event.intersects.length === 0) return;
      if (judgeResult(this.circleBit, this.crossBit) !== 'none') return;
      const intersect = event.intersects[0];
      const { point } = intersect;
      const x = Math.round(point.x / 3);
      const y = Math.round(point.z / 3);

      const bit = toBit(x, y);

      // eslint-disable-next-line no-bitwise
      if ((this.circleBit & bit) !== 0 || (this.crossBit & bit) !== 0) return;
      this.dispatchEvent({ type: 'place', x, y });
    });
  }

  // マーカーを配置する
  public placeMarkerModel(x: number, y: number, playerType: Player) {
    const marker = playerType === 'circle' ? this.circleModelTemplate?.clone() : this.crossModelTemplate?.clone();
    if (!marker) return;
    marker.position.set(x * 3, 0.1, y * 3);
    this.scene.add(marker);
  }
}
