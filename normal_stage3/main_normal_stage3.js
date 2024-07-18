let vcan = document.createElement("canvas"); //裏画面
let vcon = vcan.getContext("2d");

let can = document.getElementById("can"); //実画面
let con = can.getContext("2d");

vcan.width  = SCREEN_SIZE_W;
vcan.height = SCREEN_SIZE_H;  //裏画面のサイズ

can.width  = SCREEN_SIZE_W << 2;
can.height = SCREEN_SIZE_H << 2;  //実画面のサイズ


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

//キーボード
let keyboard = {};

//ループ開始
window.onload = function()
{
    startTime = performance.now();
    mainLoop();
}

//更新処理
function update()
{
    
}

//描画処理
function draw()
{
    //画面を水色でクリア
    vcon.fillStyle = "#66AAFF";
    vcon.fillRect(0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H);
    
    //デバッグ情報を表示
    vcon.font = "24px 'Impact'"; 
    vcon.fillStyle = "white";
    vcon.fillText("FRAME:"+frameCount, 10, 20);
    vcon.fillText("STAGE3", 120, 20);

    con.drawImage(vcan, 0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H, 0, 0, SCREEN_SIZE_W << 2, SCREEN_SIZE_H << 2);
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

//キーボードが押されたときに呼ばれる
document.onkeydown = function(e)
{
    if(e.keyCode == 37) keyboard.Left  = true;
    if(e.keyCode == 39) keyboard.Right = true;
    if(e.keyCode == 40) keyboard.Up    = true;
    if(e.keyCode == 38) keyboard.Down  = true;

    // if(e.keyCode == 65) filed.scx--;
    // if(e.keyCode == 83) filed.scx++;
}

//キーボードが離されたときに呼ばれる    
document.onkeyup = function(e)
{
    if(e.keyCode == 37) keyboard.Left  = false;
    if(e.keyCode == 39) keyboard.Right = false;
    if(e.keyCode == 40) keyboard.Up    = false;
    if(e.keyCode == 38) keyboard.Down  = false;
}