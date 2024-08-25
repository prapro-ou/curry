let vcan = document.createElement("canvas"); //裏画面
let vcon = vcan.getContext("2d");

let can = document.getElementById("can"); //実画面
let con = can.getContext("2d");

vcan.width  = SCREEN_W;
vcan.height = SCREEN_H;  //裏画面のサイズ

can.width  = SCREEN_W << 2;
can.height = SCREEN_H << 2;  //実画面のサイズ

vcon.mozImageSmoothingEnabled    = false;
vcon.webkitImageSmoothingEnabled = false;
vcon.msImageSmoothingEnabled     = false;
vcon.imageSmoothingEnabled       = false;

con.mozImageSmoothingEnabled     = false;
con.webkitImageSmoothingEnabled  = false;
con.msImageSmoothingEnabled      = false;
con.imageSmoothingEnabled        = false;

//フレームレート維持
let frameCount = 0;
let startTime;
let isStart = false;

//スタートボタンを作成
let startButton = document.getElementById("startButton");
let overlay     = document.getElementById("overlay");

//キーボード
let keyboard = {};

//png取得
let png_boss_blobfish = new Image();
png_boss_blobfish.src = "boss_blobfish.png";

let png_defeat_enemy_animation = new Image();
png_defeat_enemy_animation.src = "defeat_enemy_animation.png";

let png_rakutankun = new Image();
png_rakutankun.src = "rakutankun_v4.png";

let png_boss_stage_sprite = new Image();
png_boss_stage_sprite.src = "nomal_stage_sprite.png";

let png_item2 = new Image();
png_item2.src = "item2.png";

let png_hp1 = new Image();
png_hp1.src = "hp1.png";

let png_hp2 = new Image();
png_hp2.src = "hp2.png";

let png_hp3 = new Image();
png_hp3.src = "hp3.png";

let png_shussekiten = new Image();
png_shussekiten.src = "item.png";

let png_treasure = new Image();
png_treasure.src = "sprite_map.png";

let png_bakuhatsu = new Image();
png_bakuhatsu.src = "bakuhatsu.png"; 



//ローカルデータから読み込む
let shussekiCount = parseInt(localStorage.getItem('shussekiCount')) || 0;
let hitPoint = parseInt(localStorage.getItem('HP')) || 4;
let stage = localStorage.getItem('stage');
let drinkCount = parseInt(localStorage.getItem('drinkCount')) || 0;

//BGM音源取得
const boss_stage_bgm = document.getElementById('boss_stage_bgm');
boss_stage_bgm.volume = 0.1;

const game_over_sound = document.getElementById('game_over_sound');
game_over_sound.volume = 0.3;



//落単くんクラス作成
let rakutankun = new Rakutankun(64, 176);

//ブロブフィッシュクラス作成
let boss = new Boss_blobfish(240, 112);

//フィールド作成
let field = new Field();

//
let hp = new HP(4, 1);


//クリアした後に扱うクラス
let clear = new ClearStage2();


//酒クラス
let drink_array = [];

//ミニブロブクラス
let miniblob_array = [];
let miniblob_num = 0;

//肉弾クラス
let meatball_array = [];
let meatball_num = 0;

//ゲームオーバーフラグ
let isGameOver = false;

//スタートボタンを押すとループ開始
startButton.onclick = function()
{
    startTime = performance.now();
    isStart   = true;

    background.style.display     = 'none';
    startButton.style.display    = 'none';

    mainLoop();

    boss_stage_bgm.play();

}

function create_drink()
{
    drink_array.push(new Drink(rakutankun.x, rakutankun.y, drinkCount));
    drinkCount--;
}

function create_miniblob()
{
    miniblob_array.push(new Mini_blobfish(boss.x, boss.y));
    miniblob_num++;
    boss.isCreateMini = false;
}

function create_meatball()
{
    meatball_array.push(new MeatBall(boss.x, boss.y));
    meatball_num++;
    boss.isCreateMeat = false;
}


//更新処理
function update()
{
    if(!isStart) return;

    if(isGameOver) return;

    //フィールドの更新
    field.update();

    //敵クラスの更新
    boss.update();

    //酒クラスの更新
    drink_array.forEach(Drink => Drink.update());

    //当たったら酒瓶も消す
    drink_array.forEach(Drink => {if(Drink.isAttack){
        Drink.deleteSelf();
        }
    });

    //ミニブロブ生成
    if(boss.isCreateMini) create_miniblob();
    
    //ミニブロブの更新
    miniblob_array.forEach(Mini_blobfish => Mini_blobfish.update());
    miniblob_array.forEach(Mini_blobfish => {if(Mini_blobfish.isHitMiniblob){
            rakutankun.isDamage = true;
        }
    });

    //ミニブロブ削除
    let currentTime = performance.now();
    miniblob_array = miniblob_array.filter(Mini_blobfish => currentTime - Mini_blobfish.cbtime < 6000);

    //肉弾生成
    if(boss.isCreateMeat) create_meatball();

    //肉弾の更新
    meatball_array.forEach(MeatBall => MeatBall.update());
    meatball_array.forEach(MeatBall => {
        if(MeatBall.isHitMeatBall){
            rakutankun.isDamage = true;
        }
    });

    //肉弾削除
    meatball_array = meatball_array.filter(MeatBall => currentTime - MeatBall.cbtime < 2000);

    //落単くんの更新
    rakutankun.update();

    //HPクラスの更新
    hp.update();

    //ゲームオーバー実装したら変更する
    if(isGameOver){
        boss_stage_bgm.pause();
        game_over_sound.play();
        showDialog("rakutankaihi.html", "Game Over!\n Back Home...\n");

    }


}

//描画処理
function draw()
{
    //
    field.draw();

    //ボスを描画
    boss.draw();

    //酒クラスの描画
    drink_array.forEach(Drink => Drink.draw());

    //ミニブロブの描画
    miniblob_array.forEach(Mini_blobfish => Mini_blobfish.draw());

    //肉弾の描画
    meatball_array.forEach(MeatBall => MeatBall.draw());

    //落単くんを表示
    rakutankun.draw();

    //HPの描画
    hp.draw();

    vcon.font = "16px 'Impact'"; 
    vcon.fillStyle = "Blue";
    vcon.fillText("STAGE4", 300, 15);

    //酒の残数表示
    vcon.drawImage(png_item2, 0, 0, 16, 32, 75, 1, 16, 16);
    vcon.font = "14px 'Impact'"; 
    vcon.fillStyle = "white";
    vcon.fillText(drinkCount, 94, 15);


    //出席点表示
    vcon.drawImage(png_shussekiten, 80, 0, 16, 16, 39, 1, 16, 16);
    vcon.font = "14px 'Impact'"; 
    vcon.fillStyle = "white";
    vcon.fillText(shussekiCount, 58, 15);

    //仮装画面から実画面へ拡大転送
    //2倍？ 2ビットシフト（4倍）？
    con.drawImage(vcan, 0, 0, SCREEN_W, SCREEN_H, 0, 0, SCREEN_W << 2, SCREEN_H << 2);
}

/********* クリアした後の処理 要編集 ********/
//画面遷移のアニメーション
function startSlideAnimation(url){
    const overlay = document.getElementById('overlay');
    overlay.classList.add('active');
    setTimeout(() => {
        window.location.href = url;
    }, 3000);   //次画面への待ち時間3秒
}


//ダイアログを表示させる
function showDialog(url, message){
    const modal = document.getElementById('customModal');
    const modalMessage = document.getElementById('modalMessage');
    const modalOK = document.getElementById('modalOK');

    modalMessage.textContent = message;
    modal.style.display = 'block';

    modalOK.onclick = () => {
        modal.style.display = 'none';
        startSlideAnimation(url);
    }
}

function clear_update(){

    //フィールド更新
    field.update();

    //クリア更新処理
    clear.update();

    //らくたん君更新
    rakutankun.update();

    //宝箱を開けたら，ダイアログを表示させる
    if(clear.treasure_count == 4){
        boss_stage_bgm.pause();
        showDialog("rakutankaihi.html", "Game Clear!!\n");
        localStorage.setItem('isStage4Clear', boss.stageClear);
        localStorage.setItem('shussekiCount', rakutankun.shussekiCount);
        localStorage.setItem('HP', hp.hitPoint);
        localStorage.setItem('stage', '4');
    }
}

function clear_draw(){
    
    //フィールド描画
    field.draw();

    //クリア描画処理
    clear.draw();

    //らくたん君描画
    rakutankun.draw();

    //HPの描画
    hp.draw();

    vcon.font = "16px 'Impact'"; 
    vcon.fillStyle = "Blue";
    vcon.fillText("STAGE4", 300, 15);

    //酒の残数表示
    vcon.drawImage(png_item2, 0, 0, 16, 32, 75, 1, 16, 16);
    vcon.font = "14px 'Impact'"; 
    vcon.fillStyle = "white";
    vcon.fillText(drinkCount, 94, 15);

    //出席点表示
    vcon.drawImage(png_shussekiten, 80, 0, 16, 16, 39, 1, 16, 16);
    vcon.font = "14px 'Impact'"; 
    vcon.fillStyle = "white";
    vcon.fillText(shussekiCount, 58, 15);


    con.drawImage(vcan, 0, 0, SCREEN_W, SCREEN_H, 0, 0, SCREEN_W << 2, SCREEN_H << 2);

}

/********* クリアした後の処理 要編集 ********/


//メインループ
function mainLoop(){
    let nowTime = performance.now();
    let nowFrame = (nowTime-startTime) / GAME_FPS;

    if(boss.stageClear){
        if (nowFrame > frameCount) {
            let c = 0;
            while (nowFrame > frameCount) {
                frameCount++;
                // クリア更新処理
                clear_update();
                if (++c >= 4) break;
            }
            // クリア描画処理
            clear_draw();
        }
    }
    else{
        if (nowFrame > frameCount){
            let c = 0;
            while (nowFrame > frameCount){
                frameCount++;
                //更新処理
                update();
                if (++c >= 4) break;
            }
            //描画処理
            draw();
        }
    }
    requestAnimationFrame(mainLoop);
}



//キーボードが押されたときに呼ばれる
document.onkeydown = function(e)
{
    if(e.keyCode == 65) keyboard.Left  = true;
    if(e.keyCode == 68) keyboard.Right = true;
    if(e.keyCode == 83) keyboard.Jump  = true;
    if(e.keyCode == 13){
        keyboard.Enter = true;
        if(drinkCount > 0) create_drink();
    }
}

//キーボードが離されたときに呼ばれる    
document.onkeyup = function(e)
{
    if(e.keyCode == 65) keyboard.Left  = false;
    if(e.keyCode == 68) keyboard.Right = false;
    if(e.keyCode == 83) keyboard.Jump  = false;
    if(e.keyCode == 13) keyboard.Enter = false;
}

if(!isStart){
    startTime = performance.now();
    mainLoop();
}
