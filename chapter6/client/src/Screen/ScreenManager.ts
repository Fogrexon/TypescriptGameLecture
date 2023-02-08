export interface IScreenControllable {
  startScreen(): void;
  endScreen(): void;
}

export class ScreenManager {
  private static screenMap: Map<string, IScreenControllable> = new Map();
  private static currentScene: string = ''

  public static start(firstScene: string) {
    if (!this.screenMap.has(firstScene)) throw new Error('First scene not found')
    ScreenManager.currentScene = firstScene
    ScreenManager.screenMap.get(firstScene)?.startScreen()
  }
  public static addScreen(name: string, screen: IScreenControllable) {
    ScreenManager.screenMap.set(name, screen);
  }

  public static moveScreen(name: string) {
    if (!this.screenMap.has(name)) throw new Error('Scene not found')
    ScreenManager.screenMap.get(ScreenManager.currentScene)?.endScreen()
    ScreenManager.screenMap.get(name)?.startScreen()
    ScreenManager.currentScene = name
  }
}