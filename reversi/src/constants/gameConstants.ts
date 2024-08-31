// gameConstants.ts
export const BOARD_SIZE = 8; // ボードサイズの定数

export const TileStatus = {
  Empty: "Empty",
  Black: "Black",
  White: "White",
} as const;

export type TileStatusType = keyof typeof TileStatus;

// 方向を表すベクトル（上下左右、斜め）
export const directions = [
  [-1, 0], // 上
  [1, 0], // 下
  [0, -1], // 左
  [0, 1], // 右
  [-1, -1], // 左上
  [-1, 1], // 右上
  [1, -1], // 左下
  [1, 1], // 右下
];
