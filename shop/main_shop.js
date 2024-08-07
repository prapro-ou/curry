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

//
// let makuraCount = 1;
// document.getElementById('box').textContent = `${makuraCount}/${10}`;


//フレームレート維持
let frameCount = 0;
let startTime;

//アイテム画像を取得
let item = new Image();
item.src = "item.png";

let png_tani = new Image();
png_tani.src = "tan-i.png";

let png_hp1 = new Image();
png_hp1.src = "hp1.png";

let png_hp2 = new Image();
png_hp2.src = "hp2.png";

let png_hp3 = new Image();
png_hp3.src = "hp3.png";

//落単くん画像を取得
let rakutankun_kun = new Image();
rakutankun_kun.src = "rakutan_kun_run.png";

//落単くん画像2を取得
let rakutankun_kun_v2 = new Image();
rakutankun_kun_v2.src = "rakutan-kun_v2.png";

//落単くんをつくる
let rakutankun = new Shop_Rakutankun(170, 80);

//HPクラス
let shop_hp = new shop_HP();

//パンチクラス
let shop_panchi = new shop_Panchi(2, 32);

//キーボード
let keyboard = {};

//更新処理
function update()
{
    //HPの更新
    shop_hp.update();

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

    vcon.font = "12px 'Impact'"; 
    vcon.fillStyle = "White";
    vcon.fillText("100", 51, 13);

    //パンチ描画
    shop_panchi.draw();

    //出席点表示
    vcon.drawImage(png_tani, 0, 0, 16, 16, 33, 0, 16, 16);

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
    vcon.drawImage(item, 32, 0, 16, 16, 15, 75, 32, 32);
    //酒
    vcon.drawImage(item, 32, 16, 32, 32, 65, 75, 32, 32);
    //ジュース
    vcon.drawImage(item, 64, 16, 32, 32, 115, 75, 32, 32);

    //落単君
    vcon.drawImage(rakutankun_kun_v2, 0, 0, 32, 32, 0, 137, 55, 55);
    
    //人魚
    if((frameCount%100) <= 25){
        vcon.drawImage(item, 0, 48, 32, 32, 182, 119, 64, 64);
    }
    else if((frameCount%100) > 25 && (frameCount%100) <= 50){
        vcon.drawImage(item, 32, 48, 32, 32, 182, 118, 64, 64);
    }
    else if((frameCount%100) > 50 && (frameCount%100) <= 75){
        vcon.drawImage(item, 64, 48, 32, 32, 182, 118, 64, 64);
    }
    else vcon.drawImage(item, 32, 48, 32, 32, 182, 118, 64, 64);

    //落単くんを表示
    rakutankun.draw();

    //HPの描画
    shop_hp.draw();

    //仮想画面から実画面へ拡大転送
	con.drawImage(vcan,0,0,256,192,
		0,0,SCREEN_SIZE_W << 2,SCREEN_SIZE_H << 2);

	
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

