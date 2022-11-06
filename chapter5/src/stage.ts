import {
  BoxGeometry, Camera, Group, Mesh, MeshBasicMaterial, Renderer, Scene,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import circleModel from './circle.glb?url';
import crossModel from './cross.glb?url';
import { predict, predictBest } from './tictactoe/predict';
import {
  BoardBit, isWin, toBit, toCoordinate,
} from './tictactoe/utils';
import { Interaction } from './utils/interaction';

export class Stage {
  private scene: Scene;

  private interaction: Interaction;

  private circleModelTemplate: Group | null = null;

  private crossModelTemplate: Group | null = null;

  private circleBit: BoardBit = 0;

  private crossBit: BoardBit = 0;

  private currentPlayer: 'circle' | 'cross' = 'circle';

  constructor(renderer: Renderer, scene: Scene, camera: Camera, fileLoader: GLTFLoader) {
    this.scene = scene;

    fileLoader.load(circleModel, (modelData) => {
      this.circleModelTemplate = modelData.scene;
    });
    fileLoader.load(crossModel, (modelData) => {
      this.crossModelTemplate = modelData.scene;
    });

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

    this.interaction = new Interaction(renderer, board, camera);
    this.interaction.addEventListener('click', (event) => {
      if (event.intersects.length === 0) return;
      if (isWin(this.circleBit, this.crossBit) !== 'none') return;
      const intersect = event.intersects[0];
      const { point } = intersect;
      const x = Math.round(point.x / 3);
      const y = Math.round(point.z / 3);

      // eslint-disable-next-line no-bitwise
      const bit = toBit(x, y);

      // eslint-disable-next-line no-bitwise
      if ((this.circleBit & bit) !== 0 || (this.crossBit & bit) !== 0) return;
      this.placeMarker(x, y);
    });
  }

  public update(time: number) {
    // no impl
  }

  public placeMarker(x: number, y: number) {
    this.placeMarkerModel(x, y, 'circle');

    this.circleBit += toBit(x, y);
    if (isWin(this.circleBit, this.crossBit) !== 'none') return;

    const predTree = predictBest(this.circleBit, this.crossBit, 'cross');

    console.log(this.circleBit, this.crossBit, predTree);

    // eslint-disable-next-line no-bitwise
    const nextPlace = toCoordinate(this.crossBit ^ predTree.cross);
    this.crossBit = predTree.cross;
    this.placeMarkerModel(nextPlace[0], nextPlace[1], 'cross');
  }

  public placeMarkerModel(x: number, y: number, playerType: 'circle'|'cross') {
    const marker = playerType === 'circle' ? this.circleModelTemplate?.clone() : this.crossModelTemplate?.clone();
    if (!marker) return;
    marker.position.set(x * 3, 0.1, y * 3);
    this.scene.add(marker);
  }
}
