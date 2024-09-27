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

//平滑化
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

//アイテム画像を取得
let item = new Image();
item.src = "../png/item.png";

let item2 = new Image();
item2.src = "../png/item2.png";

let item_done = new Image();
item_done.src = "../png/item_done.png";

let png_hp1 = new Image();
png_hp1.src = "../png/hp1.png";

let png_hp2 = new Image();
png_hp2.src = "../png/hp2.png";

let png_hp3 = new Image();
png_hp3.src = "../png/hp3.png";


//落単くん画像を取得
let rakutankun_kun = new Image();
rakutankun_kun.src = "../png/rakutan_kun_run.png";

//落単くん画像2を取得
let rakutankun_kun_v2 = new Image();
rakutankun_kun_v2.src = "../png/rakutan-kun_v2.png";

//吹き出し画像取得
let speach = new Image();
speach.src = "../png/speach_bubble.png";

let comment = new Image();
comment.src = "../png/comment.png";

//矢印画像取得
let arrow = new Image();
arrow.src = "../png/arrow.png";


//ローカルストレージから読み込む
let shussekiCount = parseInt(localStorage.getItem('shussekiCount')) || 0;
let hitPoint = parseInt(localStorage.getItem('HP')) || 4;
let stage = localStorage.getItem('stage');

//BGM
const shop_bgm = document.getElementById('shop_bgm');
shop_bgm.volume = 0.01;
shop_bgm.loop = true;


//落単くんをつくる
let rakutankun = new Shop_Rakutankun(170, 80);

//HPクラス
let hp = new HP(1, 1);

//パンチクラス
let shop_panchi = new shop_Panchi(2, 32);

//キーボード
let keyboard = {};


//更新処理
function update()
{
    //HPの更新
    hp.update();

    //パンチ更新
    shop_panchi.update();

    //落単くんの更新
    rakutankun.update();
}

//描画処理
function draw()
{
    //画面を黒にする
	vcon.fillStyle="#101010";
	vcon.fillRect(0,0,SCREEN_SIZE_W,SCREEN_SIZE_H);

    //出席カウント残数
    vcon.font = "12px 'Impact'"; 
    vcon.fillStyle = "White";
    vcon.fillText(shussekiCount, 51, 13);

    //出席点表示
    vcon.drawImage(item, 80, 0, 16, 16, 33, 0, 16, 16);

    //一段目
    //枕
    vcon.drawImage(item, 0, 0, 16, 16, 15, 25, 32, 32);
    //エナジードリンク
    vcon.drawImage(item, 16, 0, 16, 16, 65, 25, 32, 32);
    //水
    vcon.drawImage(item, 0, 16, 32, 32, 115, 25, 32, 32);
    //酒
    vcon.drawImage(item, 32, 16, 32, 32, 165, 25, 32, 32);
    //ジュース
    vcon.drawImage(item, 64, 16, 32, 32, 215, 25, 32, 32);

    //二段目
    //鉛筆
    if(stage == '1' || stage == '3'){
        vcon.drawImage(item, 32, 0, 16, 16, 15, 75, 32, 32);
    }
    else vcon.drawImage(item_done, 0, 0, 16, 16, 15, 75, 32, 32);
    
    //日本酒
    if(stage == '1') vcon.drawImage(item2, 16, 16, 16, 16, 65, 70, 38, 38);
    else if(stage == '2' || stage == '4') vcon.drawImage(item2, 0, 0, 16, 32, 75, 75, 16, 32);
    else if(stage == '3') vcon.drawImage(item_done, 48, 0, 16, 32, 75, 75, 16, 32);
    
    // //ダンベル
    // vcon.drawImage(item2, 16, 0, 16, 16, 120, 75, 32, 32);
    // vcon.drawImage(item2, 16, 16, 16, 16, 117, 70, 38, 38); /*要変更*/
    // //vcon.drawImage(item_done, 16, 0, 16, 16, 120, 75, 32, 32);
    
    // //参考書
    // vcon.drawImage(item, 48, 0, 16, 16, 175, 73, 32, 32);
    // vcon.drawImage(item2, 16, 16, 16, 16, 173, 70, 38, 38); /*要変更*/
    // //vcon.drawImage(item_done, 32, 0, 16, 16, 175, 73, 32, 32);
    
    //矢印
    vcon.drawImage(arrow, 0, 0, 64, 32, 225, 93, 48, 24);

    //落単君
    vcon.drawImage(rakutankun_kun_v2, 0, 0, 32, 32, 0, 137, 55, 55);
    
    //人魚
    if((frameCount%100) <= 25){
        vcon.drawImage(item, 0, 48, 32, 32, 190, 119, 64, 64);
    }
    else if((frameCount%100) > 25 && (frameCount%100) <= 50){
        vcon.drawImage(item, 32, 48, 32, 32, 190, 118, 64, 64);
    }
    else if((frameCount%100) > 50 && (frameCount%100) <= 75){
        vcon.drawImage(item, 64, 48, 32, 32, 190, 118, 64, 64);
    }
    else vcon.drawImage(item, 32, 48, 32, 32, 190, 118, 64, 64);

    //パンチ描画
    shop_panchi.draw();

    //落単くんを表示
    rakutankun.draw();

    //HPの描画
    hp.draw();

    //仮想画面から実画面へ拡大転送
	con.drawImage(vcan,0,0,256,192,0,0,SCREEN_SIZE_W << 2,SCREEN_SIZE_H << 2);

	
}

//ループ開始
startButton.onclick = function()
{
    startTime = performance.now();
    isStart = true;

    background.style.display     = 'none';
    startButton.style.display    = 'none';

    //BGM再生
    shop_bgm.play();

    mainLoop();
}

//メインループ
function mainLoop()
{
    let nowTime = performance.now();
    let nowFrame = (nowTime-startTime) / GAME_FPS; //？

    if( nowFrame > frameCount )//？
        {
            let c=0;
            while( nowFrame > frameCount )
            {
                frameCount++;
                //更新処理
                update();
                if( ++c>=4 )break;
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
    if(e.keyCode == 71) keyboard.Get   = true;
}

//キーボードが離されたときに呼ばれる    
document.onkeyup = function(e)
{
    if(e.keyCode == 37) keyboard.Left  = false;
    if(e.keyCode == 39) keyboard.Right = false;
    if(e.keyCode == 40) keyboard.Up    = false;
    if(e.keyCode == 38) keyboard.Down  = false;
    if(e.keyCode == 71) keyboard.Get   = false;
}

if(!isStart){
    startTime = performance.now();
    mainLoop();
}
