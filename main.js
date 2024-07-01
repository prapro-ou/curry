const GAME_FPS = 1000/60;
const SCREEN_SIZE_W = 224;
const SCREEN_SIZE_H = 256;

let vcan = document.createElement("canvas"); //裏画面
let vcon = vcan.getContext("2d");

let can = document.getElementById("can"); //実画面
let con = can.getContext("2d");

vcan.width  = SCREEN_SIZE_W;
vcan.height = SCREEN_SIZE_H;  //裏画面のサイズ

can.width  = SCREEN_SIZE_W*3;
can.height = SCREEN_SIZE_H*3;  //実画面のサイズ

con.mozimageSmoothingEnabled    = false;
con.mozimageSmoothingEnabled    = false;
con.imageSmoothingEnabled       = false;
con.webkitimageSmoothingEnabled = false;
con.msimageSmoothingEnabled     = false;

//フレームレート維持
let frameCount = 0;
let startTime;

//更新処理
function update()
{

}

//描画処理
function draw()
{
    //画面を水色でクリア
    vcon.fillStyle = "#000055";
    vcon.fillRect(0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H);

    //デバッグ情報を表示
    vcon.font = "24px 'Impact'"; 
    vcon.fillStyle = "white";
    vcon.fillText("FRAME:"+frameCount, 10, 20);

    con.drawImage(vcan, 0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H, 0, 0, SCREEN_SIZE_W*3, SCREEN_SIZE_H*3);

}


//ループ開始
window.onload = function()
{
    startTime = performance.now();
    mainLoop();
}

//メインループ
function mainLoop()
{
    let nowTime = performance.now();
    let nowFrame = (nowTime - startTime) / GAME_FPS;

    if(nowFrame > frameCount){

        let c = 0;
        while(nowFrame > frameCount){
            frameCount++;
            //更新処理
            update();
            if(++c>=4) break;
        }
        //描画処理
        draw();
    }

    requestAnimationFrame(mainLoop);
}