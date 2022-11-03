# Chapter 2

キャンバスグラフィックスの基礎と、簡単なアニメーション、インタラクティブな動作の作成方法、そしてキャンバス API を直に触ることの大変さを学びます。

## HTML Canvas 要素と描画コンテキストの取得

```html
<canvas id="canvas" style="border: 1px solid black;"></canvas>
```

```ts
const ctx = canvas.getContext('2d');
```

`getContext` で描画コンテキストを取得できます。このコンテキストの図形や画像を描画するメソッドを呼び出す事でキャンバスに描画できます。

## `game/init.ts`

最初の状態のコードは以下のようになっています。

```ts
export const gameStart = (
  _: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) => {
  ctx.fillStyle = 'black';
  ctx.font = '48px sans-serif';
  ctx.textBaseline = 'top';
  ctx.fillText('Chapter2 Canvas', 0, 0);
  ctx.fillRect(100, 100, 100, 100);
};
```

canvas グラフィックスは非常に手続き的な形で描画を行います。このコードでは、`fillStyle` を `black` に設定して、`font` を `'48px sans-serif'` に設定……というようなコードになっています。

### 演習

1. 文字を赤色にしてください。
2. 文字を `serif` 体にしてください。
3. `textBaseline` の意味はなんでしょうか。`middle` や `bottom` にしてみて、結果を見てください。

## パス

Canvas では正方形以外にも、円や楕円、多角形を描画できます。これらの図形を描画するには、パスを使います。

`main.ts` で読み込む先を変えてください

```ts
import { gameStart } from './game/init';
```

↓

```ts
import { gameStart } from './game/path';
```

`game/path.ts` のコードは以下のようになっています。

```ts
export const gameStart = (
  _: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) => {
  ctx.fillStyle = 'black';
  // 三角形 (fill)
  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.lineTo(200, 100);
  ctx.lineTo(150, 200);
  ctx.closePath();
  ctx.fill();
  // 円 (fill)
  ctx.beginPath();
  ctx.arc(300, 150, 50, 0, Math.PI * 2, false);
  ctx.fill();
  // 線 （stroke)
  ctx.beginPath();
  ctx.moveTo(400, 100);
  ctx.lineTo(500, 100);
  ctx.lineTo(450, 200);
  ctx.closePath();
  ctx.stroke();
  // 円弧（stroke)
  ctx.beginPath();
  ctx.arc(600, 150, 50, 0, (Math.PI * 2) / 3, false);
  ctx.stroke();
};
```

`beginPath` でパスを開始し、`moveTo` でパスの開始位置を指定します。`lineTo` でパスを追加していきます。`closePath` でパスを閉じます。最後に `fill` で塗りつぶすか、`stroke` で線を引くことができます。

### 演習

1. `線 （stroke)` を改造して、多角形にしてください
2. `円弧（stroke)` を改造して、扇型にしてください

## 移動、回転
