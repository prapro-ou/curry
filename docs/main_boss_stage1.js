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
let png_boss_tako = new Image();
png_boss_tako.src = "boss_tako.png";

let png_defeat_enemy_animation = new Image();
png_defeat_enemy_animation.src = "defeat_enemy_animation.png";

let png_rakutankun = new Image();
png_rakutankun.src = "rakutankun_v4.png";

let png_boss_stage_sprite = new Image();
png_boss_stage_sprite.src = "nomal_stage_sprite.png";

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



//ローカルデータから読み込む
let shussekiCount = parseInt(localStorage.getItem('shussekiCount')) || 0;
let hitPoint = parseInt(localStorage.getItem('HP')) || 4;
let stage = localStorage.getItem('stage');
let penCount = parseInt(localStorage.getItem('penCount')) || 0;


//BGM音源取得
const boss_stage_bgm = document.getElementById('boss_stage_bgm');
boss_stage_bgm.volume = 0.1;

const game_over_sound = document.getElementById('game_over_sound');
game_over_sound.volume = 0.3;

const ink_sound = document.getElementById('ink_sound');
ink_sound.volume = 0.3;

const tentacle_sound = document.getElementById('tentacle_sound');
tentacle_sound.volume = 0.3;


//落単くんクラス作成
let rakutankun = new Rakutankun(128 , 200);

//ボスタコクラス作成
let boss = new Boss_tako(64, 70);


//火炎放射器クラスの作成
let fire = new Fire(176, -5);

//フィールド作成
let field = new Field();

//HPクラス作成
let hp = new HP(4, 1);


//鉛筆クラス
let pen_array = [];

//墨クラス
let ink_array = [];
let ink_num = 0;

//触手クラス
let tentacle_array = [];
let tentacle_num = 0;

let clear = new Clear();


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

function create_pen()
{
    pen_array.push(new Pen(rakutankun.x, rakutankun.y, penCount));
    penCount--;
}

function create_ink()
{
    ink_array.push(new Ink(boss.x, boss.y));
    ink_sound.play();
    ink_num++;
}

function create_tentacle()
{
    tentacle_array.push(new Tentacle());
    tentacle_num++;
    tentacle_sound.play();
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

    //火炎放射器クラスの更新
    fire.update();


    //鉛筆クラスの更新
    pen_array.forEach(Pen => Pen.update());

    //当たった鉛筆を削除する
    pen_array = pen_array.filter(Pen => !Pen.isHit);

    //墨クラスの更新
    ink_array.forEach(Ink => Ink.update());

    //触手クラスの更新
    tentacle_array.forEach(Tentacle => Tentacle.update());

    //簡潔にできます
    //インクの生成
    // InkCreate();
    if((frameCount % 100 == 0) && !boss.isPen) create_ink();

    //触手の生成
    // TentacleCreate();
    if(frameCount % 300 == 0) create_tentacle();

    //触手の削除
    tentacle_array = tentacle_array.filter(Tentacle => Tentacle.tentacleTimeCount < 300);


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
    // //画面を水色でクリア
    // vcon.fillStyle = "#66AAFF";
    // vcon.fillRect(0, 0, SCREEN_W, SCREEN_H);

    //フィールド描画
    field.draw();

    //ボスを描画
    boss.draw();

    //火炎放射器クラスの描画
    fire.draw();


    //鉛筆クラスの描画
    pen_array.forEach(Pen => Pen.draw());

    //墨クラスの描画
    ink_array.forEach(Ink => Ink.draw());

    //触手クラスの描画
    tentacle_array.forEach(Tentacle => Tentacle.draw());
    
    //HPの描画
    hp.draw();

    //落単くんを表示
    rakutankun.draw();

    vcon.font = "16px 'Impact'"; 
    vcon.fillStyle = "Blue";
    vcon.fillText("STAGE1", 206, 15);

    //鉛筆の残数表示
    vcon.drawImage(png_boss_tako, 16, 64, 16, 16, 75, 1, 16, 16);
    vcon.font = "14px 'Impact'"; 
    vcon.fillStyle = "white";
    vcon.fillText(penCount, 94, 15);

    //出席点表示
    vcon.drawImage(png_shussekiten, 80, 0, 16, 16, 39, 1, 16, 16);
    vcon.font = "14px 'Impact'"; 
    vcon.fillStyle = "white";
    vcon.fillText(shussekiCount, 58, 15);


    //仮装画面から実画面へ拡大転送
    //2ビットシフト（4倍）に変更しました
    con.drawImage(vcan, 0, 0, SCREEN_W, SCREEN_H, 0, 0, SCREEN_W << 2, SCREEN_H << 2);
}

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
    //フィールドクラスの更新
    field.update();

    //鉛筆クラスの更新
    pen_array.forEach(Pen => Pen.update());
    //墨クラスの更新
    ink_array.forEach(Ink => Ink.update());
    //触手クラスの更新
    tentacle_array.forEach(Tentacle => Tentacle.update());

    //HPクラスの更新
    hp.update();

    //触手の削除
    tentacle_array = tentacle_array.filter(Tentacle => Tentacle.tentacleTimeCount < 300);

    clear.update();

    //宝箱を開けたら，ダイアログを表示させる
    if(clear.treasure_count == 4){
        boss_stage_bgm.pause();
        showDialog("rakutankaihi.html", "Game Clear!!\n");
        localStorage.setItem('isStage1Clear', boss.stageClear);
        localStorage.setItem('shussekiCount', rakutankun.shussekiCount);
        localStorage.setItem('HP', hp.hitPoint);
        localStorage.setItem('stage', '1');
    }
}

function clear_draw(){
    //フィールドクラスの描画
    field.draw();

    //鉛筆クラスの描画
    pen_array.forEach(Pen => Pen.draw());
    //墨クラスの描画
    ink_array.forEach(Ink => Ink.draw());
    //触手クラスの描画
    tentacle_array.forEach(Tentacle => Tentacle.draw());

    //HPクラスの描画
    hp.draw();

    vcon.font = "16px 'Impact'"; 
    vcon.fillStyle = "Blue";
    vcon.fillText("STAGE1", 206, 15);

    //鉛筆の残数表示
    vcon.drawImage(png_boss_tako, 16, 64, 16, 16, 75, 1, 16, 16);
    vcon.font = "14px 'Impact'"; 
    vcon.fillStyle = "white";
    vcon.fillText(penCount, 94, 15);


    //出席点表示
    vcon.drawImage(png_shussekiten, 80, 0, 16, 16, 39, 1, 16, 16);
    vcon.font = "14px 'Impact'"; 
    vcon.fillStyle = "white";
    vcon.fillText(shussekiCount, 58, 15);

    clear.draw();
    
    con.drawImage(vcan, 0, 0, SCREEN_W, SCREEN_H, 0, 0, SCREEN_W << 2, SCREEN_H << 2);
}



//メインループ
function mainLoop(){
    let nowTime = performance.now();
    let nowFrame = (nowTime-startTime) / GAME_FPS;

    if (nowFrame > frameCount){
        let c = 0;
        while (nowFrame > frameCount){
            frameCount++;
            //更新処理
            if (!fire.isStageClear){
                update();
            } else {
                clear_update();
            }
            if (++c >= 4) break;
        }
        //描画処理
        if (!fire.isStageClear){
            draw();
        } else {
            clear_draw();
        }
    }
    requestAnimationFrame(mainLoop);
}

//キーボードが押されたときに呼ばれる
document.onkeydown = function(e)
{
    if(e.keyCode == 65) keyboard.Left  = true;
    if(e.keyCode == 68) keyboard.Right = true;
    if(e.keyCode == 13) {
        keyboard.Enter = true;
        if(penCount > 0) create_pen();
    }
}

//キーボードが離されたときに呼ばれる    
document.onkeyup = function(e)
{
    if(e.keyCode == 65) keyboard.Left  = false;
    if(e.keyCode == 68) keyboard.Right = false;
    if(e.keyCode == 13) keyboard.Enter = false;
}

if(!isStart){
    startTime = performance.now();
    mainLoop();
}
