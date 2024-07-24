//
// ノーマルステージで使用する定数の定義用JS
//

const GAME_FPS = 1000/60;

//画面として表示する部分のサイズ
const SCREEN_W = 256;
const SCREEN_H = 256;

//バッファゾーン
const BUFFER_ZONE = 32;

//裏画面の一画面当たりのブロックの数
const MAP_W    = SCREEN_W >> 4;
const MAP_H    = (SCREEN_H + BUFFER_ZONE) >> 4;

//ワールドマップデータのブロックの数
const FILED_W = 16;
const FILED_H = 256;

//ワールドマップのサイズ
const WORLD_W = 256;
const WORLD_H = 4096;

