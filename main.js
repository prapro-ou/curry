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

let chImg1 = new Image();
chImg1.src = "yashinoki1.png";
chImg1.onload = draw;

let chImg2 = new Image();
chImg2.src = "yashinoki2.png";
chImg2.onload = draw;

let chImg3 = new Image();
chImg3.src = "yashinoki3.png";
chImg3.onload = draw;

let chImg4 = new Image();
chImg4.src = "yashinoki4.png";
chImg4.onload = draw;

let chImg5 = new Image();
chImg5.src = "same1.png";
chImg5.onload = draw;

let chImg6 = new Image();
chImg6.src = "same2.png";
chImg6.onload = draw;

let chImg7 = new Image();
chImg7.src = "tetorapodo.png";
chImg7.onload = draw;

let chImg8 = new Image();
chImg8.src = "kobune.png";
chImg8.onload = draw;

let chImg9 = new Image();
chImg9.src = "iruka.png";
chImg9.onload = draw;


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

    con.drawImage(vcan, 0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H, 0, 0, SCREEN_SIZE_W*3, SCREEN_SIZE_H*3);

    if((frameCount%100) <= 25){
        con.drawImage(chImg2, 0, 0, 16, 16, 126, 126, 64, 64);
    }
    else if((frameCount%100) > 25 && (frameCount%100) <= 50){ 
        con.drawImage(chImg3, 0, 0, 16, 16, 126, 126, 64, 64);
    }
    else if((frameCount%100) > 50 && (frameCount%100) <= 75){ 
        con.drawImage(chImg1, 0, 0, 16, 16, 126, 126, 64, 64);
    }
    else con.drawImage(chImg4, 0, 0, 16, 16, 126, 126, 64, 64);


    if((frameCount%50) <= 25){
        con.drawImage(chImg5, 0, 0, 16, 16, 200, 400, 64, 64);
    }
    else con.drawImage(chImg6, 0, 0, 16, 16, 200, 400, 64, 64);

    con.drawImage(chImg7, 0, 0, 16, 16, 50, 350, 64, 64);
    con.drawImage(chImg8, 0, 0, 16, 16, 100, 450, 64, 64);
    con.drawImage(chImg9, 0, 0, 16, 16, 300, 500, 64, 64);


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
