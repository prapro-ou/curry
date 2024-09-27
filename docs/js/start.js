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
png_introduction.src = "./png/introduction.png";

function draw(){
    //画面を水色でクリア
    vcon.fillStyle = "#66AAFF";
    vcon.fillRect(0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H);

    vcon.drawImage(png_introduction,   0,   0,  88,   8,  40,  32, 176,  16);
    vcon.drawImage(png_introduction,   0,  24, 240,  80,  40,  80, 240,  80);

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
        draw();
    }
    requestAnimationFrame(mainLoop);
}

document.getElementById('startButton').addEventListener('click', function() {
    console.log('startButton click');
    window.location.href = './html/rakutankaihi.html'; // 遷移先のHTMLファイル
});

document.getElementById('instructionButton').addEventListener('click', function() {
    console.log('instructionButton click');
    window.location.href = './html/instruction.html'; // 遷移先のHTMLファイル
});