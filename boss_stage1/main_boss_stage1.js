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


//フィールド作成
// let field = new Field();

//png取得
let png_boss_tako = new Image();
png_boss_tako.src = "boss_tako.png";

let png_defeat_enemy_animation = new Image();
png_defeat_enemy_animation.src = "defeat_enemy_animation.png";

let png_rakutankun = new Image();
png_rakutankun.src = "rakutan-kun_v2.png";

//落単くんクラス作成
let rakutankun = new Rakutankun(128 , 200);

//ボスタコクラス作成
let boss = new Boss_tako(64, 70);


//スタートボタンを押すとループ開始
startButton.onclick = function()
{
    startTime = performance.now();
    isStart   = true;

    overlay.style.display     = 'none';
    startButton.style.display = 'none';

    mainLoop();
}


//スタートボタンを押すとループ開始
startButton.onclick = function()
{
    startTime = performance.now();
    isStart   = true;

    background.style.display     = 'none';
    startButton.style.display = 'none';

    mainLoop();
}

//更新処理
function update()
{
    if(!isStart) return;

    //フィールドの更新
    //field.update();

    //敵クラスの更新
    boss.update();

    //現在時刻
    let currentTime = performance.now();

    //落単くんの更新
    rakutankun.update();
    boss.update();
}

//描画処理
function draw()
{
    //画面を水色でクリア
    vcon.fillStyle = "#66AAFF";
    vcon.fillRect(0, 0, SCREEN_W, SCREEN_H);

    //落単くんを表示
    rakutankun.draw();
    boss.draw();

    //デバッグ情報を表示
    vcon.font = "24px 'Impact'";
    vcon.fillStyle = "white";
    vcon.fillText("FRAME:"+frameCount, 10, 20);

    //仮装画面から実画面へ拡大転送
    //2倍？ 2ビットシフト（4倍）？
    con.drawImage(vcan, 0, 0, SCREEN_W, SCREEN_H, 0, 0, SCREEN_W << 1, SCREEN_H << 1);
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
            update();
            if (++c >= 4) break;
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
}

//キーボードが離されたときに呼ばれる    
document.onkeyup = function(e)
{
    if(e.keyCode == 65) keyboard.Left  = false;
    if(e.keyCode == 68) keyboard.Right = false;
}

if(!isStart){
    startTime = performance.now();
    mainLoop();
}