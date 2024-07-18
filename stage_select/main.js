const GAME_FPS = 1000/60;
const SCREEN_SIZE_W = 256;
const SCREEN_SIZE_H = 192;

let vcan = document.createElement("canvas"); //裏画面
let vcon = vcan.getContext("2d");

let can = document.getElementById("can"); //実画面
let con = can.getContext("2d");

vcan.width  = SCREEN_SIZE_W;
vcan.height = SCREEN_SIZE_H;  //裏画面のサイズ

can.width  = SCREEN_SIZE_W*4;
can.height = SCREEN_SIZE_H*4;  //実画面のサイズ


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

//背景画像を取得
let stage_select = new Image();
stage_select.src = "stage_select_map.png";

//落単くんを取得
let rakutankun_kun = new Image();
rakutankun_kun.src = "rakutan_kun_run.png";

//マップ用のスプライトを取得
let sp_map = new Image();
sp_map.src = "sprite_map.png";


//落単くんをつくる
let rakutankun = new Stage_Rakutankun(50, 50);

//更新処理
function update()
{
    //落単くんの更新
    rakutankun.update();
}


//描画処理
function draw()
{
    //背景描画
    vcon.drawImage(stage_select, 0, 0, 256, 192, 0, 0, 256, 192);

    //デバッグ情報を表示
    // vcon.font = "16px 'Impact'"; 
    // vcon.fillStyle = "Black";
    // vcon.fillText("目指せ卒業‼", 10, 20);

    /*スプライト番号用のメモ
        イルカ
        ボート
        サメ
        宝箱
        ヤシの木
        海流*/

    //アニメーションを表示
    //ヤシの木
    if((frameCount%100) <= 25){
        vcon.drawImage(sp_map, 0, 80, 16, 16, 38, 157, 32, 32);
    }
    else if((frameCount%100) > 25 && (frameCount%100) <= 50){
        vcon.drawImage(sp_map, 16, 80, 16, 16, 38, 157, 32, 32);
    }
    else if((frameCount%100) > 50 && (frameCount%100) <= 75){
        vcon.drawImage(sp_map, 32, 80, 16, 16, 38, 157, 32, 32);
    }
    else vcon.drawImage(sp_map, 48, 80, 16, 16, 38, 157, 32, 32);

    //ボート
    if((frameCount%100) <= 25){
        vcon.drawImage(sp_map, 0, 16, 16, 16, 167, 72, 16, 16);
    }
    else if((frameCount%100) > 25 && (frameCount%100) <= 50){
        vcon.drawImage(sp_map, 16, 16, 16, 16, 167, 72, 16, 16);
    }
    else if((frameCount%100) > 50 && (frameCount%100) <= 75){
        vcon.drawImage(sp_map, 32, 16, 16, 16, 167, 72, 16, 16);
    }
    else vcon.drawImage(sp_map, 16, 16, 16, 16, 167, 72, 16, 16);

    //サメ
    if((frameCount%120) > 60){
        vcon.drawImage(sp_map, 0, 32, 16, 16, 204, 130, 16, 16);
    }
    else vcon.drawImage(sp_map, 16, 32, 16, 16, 204, 130, 16, 16);

    //イルカ1
    if((frameCount%100) <= 25){
        vcon.drawImage(sp_map, 0, 0, 16, 16, 230, 32, 16, 16);
    }
    else if((frameCount%100) > 25 && (frameCount%100) <= 50){
        vcon.drawImage(sp_map, 16, 0, 16, 16, 225, 32, 16, 16);
    }
    else if((frameCount%100) > 50 && (frameCount%100) <= 75){
        vcon.drawImage(sp_map, 32, 0, 16, 16, 220, 32, 16, 16);
    }

    //イルカ2
    if((frameCount%200) <= 50){
        vcon.drawImage(sp_map, 0, 0, 16, 16, 210, 50, 16, 16);
    }
    else if((frameCount%200) > 50 && (frameCount%200) <= 100){
        vcon.drawImage(sp_map, 16, 0, 16, 16, 205, 50, 16, 16);
    }
    else if((frameCount%200) > 100 && (frameCount%200) <= 150){
        vcon.drawImage(sp_map, 32, 0, 16, 16, 200, 50, 16, 16);
    }

    //海流1
    let src_xmax = 136;
    let src_x = src_xmax - ((frameCount>>2)%64);
    if(frameCount%200 < 100){
        vcon.drawImage(sp_map, 48, 0, 16, 16, src_x, 100, 16, 16);
    }
    // 海流2
    // if(frameCount%70 < 30){
    //     vcon.drawImage(sp_map, 48, 0, 16, 16, src_x+75, 77, 16, 16);
    // }


    //落単くんを表示
    rakutankun.draw();

    //実画面に描画
    con.drawImage(vcan, 0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H, 0, 0, SCREEN_SIZE_W << 2, SCREEN_SIZE_H << 2);

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

//キーボードが押されたときに呼ばれる
document.onkeydown = function(e)
{
    if(e.keyCode == 37) keyboard.Left  = true;
    if(e.keyCode == 39) keyboard.Right = true;
    if(e.keyCode == 40) keyboard.Up    = true;
    if(e.keyCode == 38) keyboard.Down  = true;
    if(e.keyCode == 71) keyboard.Go  = true;

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
    if(e.keyCode == 71) keyboard.Go  = false;
}

