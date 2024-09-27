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
let isStart = false;

let startButton = document.getElementById("startButton");
let overlay     = document.getElementById("overlay");

//キーボード
let keyboard = {};

//pngを取得
let stage_select = new Image();
stage_select.src = "../png/stage_select_map.png";

let rakutankun_kun = new Image();
rakutankun_kun.src = "../png/rakutan_kun_run.png";

let sp_map = new Image();
sp_map.src = "../png/sprite_map.png";

let png_rainbow = new Image();
png_rainbow.src = "../png/rainbow.png";

let png_text = new Image();
png_text.src = "../png/text.png";

let png_hp1 = new Image();
png_hp1.src = "../png/hp1.png";

let png_hp2 = new Image();
png_hp2.src = "../png/hp2.png";

let png_hp3 = new Image();
png_hp3.src = "../png/hp3.png";

let png_shussekiten = new Image();
png_shussekiten.src = "../png/item.png";


//ローカルストレージから読み込む

// 特定のキーを削除
localStorage.removeItem('penCount');
localStorage.removeItem('drinkCount');


let shussekiCount = 0;

let isStage1Clear = localStorage.getItem('isStage1Clear');
let isStage2Clear = localStorage.getItem('isStage2Clear');
let isStage3Clear = localStorage.getItem('isStage3Clear');
let isStage4Clear = localStorage.getItem('isStage4Clear');

let hitPoint = 4;

let stage = localStorage.getItem('stage') || '0';

//BGM音源取得
const stage_select_bgm = document.getElementById('stage_select_bgm');
stage_select_bgm.volume = 0.01;
stage_select_bgm.loop = true;


//落単くんをつくる
let rakutankun = new Stage_Rakutankun();

let hp = new HP(1, 1);

let isRestart = true;


//画面遷移のアニメーション
function startSlideAnimation(url){
    const overlay = document.getElementById('overlay');
    overlay.classList.add('active');
    stage_select_bgm.pause();
    setTimeout(() => {
        window.location.href = url;
    }, 3000);   //次画面への待ち時間3秒
}

//ダイアログを表示させる
function showDialog(message, url){
    const modal = document.getElementById('customModal');
    const modalMessage = document.getElementById('modalMessage');
    const modalYes = document.getElementById('modalYes');
    const modalNo = document.getElementById('modalNo');

    modalMessage.textContent = message;
    modal.style.display = 'block';

    modalYes.onclick = () => {
        modal.style.display = 'none';
        localStorage.removeItem('penCount');
        localStorage.removeItem('drinkCount');
        localStorage.removeItem('isStage1Clear');
        localStorage.removeItem('isStage2Clear');
        localStorage.removeItem('isStage3Clear');
        localStorage.removeItem('isStage4Clear');
        localStorage.removeItem('stage');
        localStorage.removeItem('shussekiCount');
        localStorage.removeItem('HP');

        this.startSlideAnimation(url);
    }

    modalNo.onclick = () => {
        modal.style.display = 'none';
        isRestart = false;
    }
}


//更新処理
function update()
{

    if(!isStart) return;

    //HP
    hp.update();

    //落単くんの更新
    rakutankun.update();

    //全クリエンディング（ダイアログ出すだけ）
    if(isStage1Clear && isStage2Clear && isStage3Clear && isStage4Clear && isRestart){
        showDialog("Congratulations!! Completed!! ", '../html/rakutankaihi.html');
    }
}

//虹を描画
function draw_rainbow(stage)
{
    let rx = 0;
    let ry = 0;

    //rx ryの値は要編集
    switch(stage){
        case 1:
            rx = 54;
            ry = 24;
            break;
        case 2:
            rx = 128;
            ry = 58;
            break;
        case 3:
            rx = 57;
            ry = 97;
            break;
        case 4:
            rx = 152;
            ry = 123;
            break;
    }
    vcon.drawImage(png_rainbow, 0, 0, 16, 16, rx, ry, 32, 32);
}


//描画処理
function draw()
{
    //背景描画
    vcon.drawImage(stage_select, 0, 0, 256, 192, 0, 0, 256, 192);

    //入学
    vcon.drawImage(png_text, 0, 8, 16, 8, 15, 50, 32, 16);

    //卒業
    vcon.drawImage(png_text, 16, 8, 16, 8, 195, 165, 32, 16);

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

    //クリアしたら虹を掛ける
    if(isStage1Clear) draw_rainbow(1);
    if(isStage2Clear) draw_rainbow(2);
    if(isStage3Clear) draw_rainbow(3);
    if(isStage4Clear) draw_rainbow(4);

    
    //落単くんを表示
    rakutankun.draw();

    //HP
    hp.draw();

    //出席点表示
    vcon.drawImage(png_shussekiten, 80, 0, 16, 16, 39, 1, 16, 16);
    vcon.font = "14px 'Impact'"; 
    vcon.fillStyle = "white";
    vcon.fillText(shussekiCount, 58, 15);


    //めざせ卒業！
    vcon.drawImage(png_text, 0, 0, 48, 8, 160, 5, 96, 16);

    //実画面に描画
    con.drawImage(vcan, 0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H, 0, 0, SCREEN_SIZE_W << 2, SCREEN_SIZE_H << 2);

}


//ループ開始
startButton.onclick = function()
{
    startTime = performance.now();
    isStart   = true;

    background.style.display     = 'none';
    startButton.style.display    = 'none';

    //BGM再生
    stage_select_bgm.play();

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
    if(e.keyCode == 65) keyboard.Left  = true;
    if(e.keyCode == 68) keyboard.Right = true;
    if(e.keyCode == 83) keyboard.Up    = true;
    if(e.keyCode == 87) keyboard.Down  = true;
    if(e.keyCode == 71) keyboard.Go  = true;

    // if(e.keyCode == 65) filed.scx--;
    // if(e.keyCode == 83) filed.scx++;
}

//キーボードが離されたときに呼ばれる    
document.onkeyup = function(e)
{
    if(e.keyCode == 65) keyboard.Left  = false;
    if(e.keyCode == 68) keyboard.Right = false;
    if(e.keyCode == 83) keyboard.Up    = false;
    if(e.keyCode == 87) keyboard.Down  = false;
    if(e.keyCode == 71) keyboard.Go  = false;
}

if(!isStart){
    startTime = performance.now();
    mainLoop();
}
