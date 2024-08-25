const GAME_FPS      = 1000/60;
const SCREEN_SIZE_W = 256;
const SCREEN_SIZE_H = 192;

//裏画面
let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");

//実画面
let can = document.getElementById("can");
let con = can.getContext("2d");

//裏画面のサイズ
vcan.width = SCREEN_SIZE_W;
vcan.height = SCREEN_SIZE_H;

//実画面のサイズ
can.width  = SCREEN_SIZE_W*4;
can.height = SCREEN_SIZE_H*4;

//平滑化みたいな？
vcon.mozImageSmoothingEnabled = false;
vcon.webkitImageSmoothingEnabled = false;
vcon.msImageSmoothingEnabled = false;
vcon.imageSmoothingEnabled = false;

con.mozImageSmoothingEnabled = false;
con.webkitImageSmoothingEnabled = false;
con.msImageSmoothingEnabled = false;
con.imageSmoothingEnabled = false;

//フレームレート維持
let frameCount = 0;
let startTime;

//説明画像を取得
let png_introduction = new Image();
png_introduction.src = "introduction.png";

//吹き出し画像取得
let speach = new Image();
speach.src = "speach_bubble.png";

const INSTRUCTION_NUMBER = 4;

// 画像の表示
let currentPng = 0;

function draw(num){
    //画面を水色でクリア
    vcon.fillStyle = "#66AAFF";
    vcon.fillRect(0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H);

    //どの説明を表示するか
    switch(num){
        case 0: //ステージセレクト画面の説明
            vcon.drawImage(png_introduction,   0, 104, 240,   8,   8,   8, 480,  16);
            vcon.drawImage(png_introduction,   0, 112, 240,  40,   8,  32, 240,  40);
            vcon.drawImage(png_introduction,   0, 496,  88,  16,   8,  80,  88,  16);
            vcon.drawImage(png_introduction,  96, 496, 136,  16,   8,  88, 136,  16);
            vcon.drawImage(png_introduction,   8, 512,   8,   8, 240, 176,   8,   8);
            break;

        case 1: //ノーマルステージ画面の説明
            vcon.drawImage(png_introduction,   0, 152, 240,   8,   8,   8, 480,  16);
            vcon.drawImage(png_introduction,   0, 160, 240,  48,   8,  32, 240,  48);
            vcon.drawImage(png_introduction,   0, 208, 240,  32,   8,  88, 240,  32);
            vcon.drawImage(png_introduction,   0, 240, 240,  64,   8, 128, 240,  64);
            vcon.drawImage(png_introduction,  16, 512,   8,   8, 240, 176,   8,   8);
            break;

        case 2: //アイテム選択画面の説明
            vcon.drawImage(png_introduction,   0, 304, 240,   8,   8,   8, 480,  16);
            vcon.drawImage(png_introduction,   0, 312, 240,   8,   8,  32, 240,   8);
            vcon.drawImage(png_introduction,   0, 344, 240,  16,   8,  40, 240,  16);
            vcon.drawImage(png_introduction,   0, 320, 240,  24,   8,  64, 240,  24);
            vcon.drawImage(png_introduction,  24, 512,   8,   8, 240, 176,   8,   8);
            break;

        case 3: //ボスステージ画面の説明
            vcon.drawImage(png_introduction,   0, 360, 240,   8,   8,   8, 480,  16);
            vcon.drawImage(png_introduction,   0, 368, 240,  64,   8,  32, 240,  64);
            vcon.drawImage(png_introduction,   0, 432, 240,  64,   8, 104, 240,  64);
            vcon.drawImage(png_introduction,  32, 512,   8,   8, 240, 176,   8,   8);
            break;
    }

    //仮装画面から実画面へ拡大転送
    con.drawImage(vcan, 0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H, 0, 0, SCREEN_SIZE_W * 4, SCREEN_SIZE_H * 4);
}

window.onload = function(){
    startTime = performance.now();
    mainLoop();
}

//メインループ
function mainLoop(){
    let nowTime = performance.now();
    let nowFrame = (nowTime-startTime) / GAME_FPS; //？

    if( nowFrame > frameCount ){
        //描画処理
        draw(currentPng);
        console.log("draw:" + currentPng);
    }
    requestAnimationFrame(mainLoop);
}


//ボタンの処理
document.getElementById('previousButton').addEventListener('click', function() {
    currentPng = (currentPng - 1 + INSTRUCTION_NUMBER) % INSTRUCTION_NUMBER;
});

document.getElementById('nextButton').addEventListener('click', function() {
    currentPng = (currentPng + 1) % INSTRUCTION_NUMBER;
});

document.getElementById('backButton').addEventListener('click', function() {
    console.log('backButton click');
    window.location.href = 'start.html';
});